import { getDb, save } from '../db/sqlite';
import { getCreation } from './creations';
import { queuePrompt, getHistory, downloadImage, buildWorkflow, loadWorkflowTemplate } from './comfyui';
import { archiveImage, writePromptFile, writeCopywritingFile } from './archive';
import { broadcast } from './wsHub';
import { getSetting } from '../config/settings';
import path from 'path';

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export interface TaskImage {
  id: string;
  task_id: string;
  creation_id: string;
  status: 'queued' | 'generating' | 'done' | 'failed';
  file_path: string;
  prompt_snapshot: string;
  error: string;
  elapsed_ms: number;
}

export interface Task {
  id: string;
  created_at: string;
  status: 'running' | 'completed' | 'cancelled' | 'failed';
  params_json: string;
}

export interface TaskParams {
  creationIds: string[];
  imagesPerCreation: number;
  width: number;
  height: number;
  promptOverride?: string;
}

interface QueueItem {
  imageId: string;
  taskId: string;
  creationId: string;
  prompt: string;
  width: number;
  height: number;
}

let queue: QueueItem[] = [];
let processing = false;
let currentTaskId: string | null = null;
let cancelled = false;

export function createTask(params: TaskParams): { task: Task; images: TaskImage[] } {
  const db = getDb();
  const taskId = uid();
  const now = new Date().toISOString();

  db.run(
    'INSERT INTO tasks (id, created_at, status, params_json) VALUES (?, ?, ?, ?)',
    [taskId, now, 'running', JSON.stringify(params)]
  );

  const images: TaskImage[] = [];
  for (const creationId of params.creationIds) {
    const creation = getCreation(creationId);
    if (!creation) continue;

    const prompt = params.promptOverride || creation.prompt;

    for (let i = 0; i < params.imagesPerCreation; i++) {
      const imageId = uid();
      db.run(
        `INSERT INTO task_images (id, task_id, creation_id, status, file_path, prompt_snapshot, error, elapsed_ms)
         VALUES (?, ?, ?, 'queued', '', ?, '', 0)`,
        [imageId, taskId, creationId, prompt]
      );
      images.push({
        id: imageId, task_id: taskId, creation_id: creationId,
        status: 'queued', file_path: '', prompt_snapshot: prompt, error: '', elapsed_ms: 0,
      });
    }
  }

  save();

  const task: Task = { id: taskId, created_at: now, status: 'running', params_json: JSON.stringify(params) };
  return { task, images };
}

export async function startTask(taskId: string): Promise<void> {
  const db = getDb();
  const result = db.exec(`SELECT * FROM task_images WHERE task_id = '${taskId}' AND status = 'queued'`);
  if (!result.length) return;

  const cols = result[0].columns;
  const items: QueueItem[] = result[0].values.map((row: unknown[]) => {
    const obj: Record<string, unknown> = {};
    cols.forEach((c: string, i: number) => { obj[c] = row[i]; });
    const creation = getCreation(obj.creation_id as string);
    return {
      imageId: obj.id as string,
      taskId: obj.task_id as string,
      creationId: obj.creation_id as string,
      prompt: (obj.prompt_snapshot as string) || creation?.prompt || '',
      width: 1024,
      height: 1024,
    };
  });

  const taskResult = db.exec(`SELECT params_json FROM tasks WHERE id = '${taskId}'`);
  if (taskResult.length && taskResult[0].values.length) {
    const params = JSON.parse(taskResult[0].values[0][0] as string) as TaskParams;
    for (const item of items) {
      item.width = params.width || 1024;
      item.height = params.height || 1024;
    }
  }

  queue = items;
  currentTaskId = taskId;
  cancelled = false;
  processing = true;

  broadcast('task:started', { taskId });
  processQueue();
}

async function processQueue(): Promise<void> {
  if (!processing) return;

  while (queue.length > 0) {
    if (cancelled) {
      processing = false;
      if (currentTaskId) {
        updateTaskStatus(currentTaskId, 'cancelled');
        broadcast('task:cancelled', { taskId: currentTaskId });
      }
      return;
    }

    const item = queue[0];
    updateImageStatus(item.imageId, 'generating');
    broadcast('image:started', { imageId: item.imageId, taskId: item.taskId });

    const startTime = Date.now();
    try {
      const template = loadWorkflowTemplate();
      const workflow = buildWorkflow(template, item.prompt, item.width, item.height);
      const { prompt_id } = await queuePrompt(workflow);

      const historyEntry = await pollUntilDone(prompt_id);
      const elapsed = Date.now() - startTime;

      const outputs = historyEntry.outputs;
      const outputNode = Object.values(outputs)[0];
      const imgInfo = outputNode?.images?.[0];

      if (!imgInfo) throw new Error('No image in ComfyUI output');

      const creation = getCreation(item.creationId);
      const creationName = creation?.name || 'unknown';
      const date = new Date().toISOString().slice(0, 10);
      const filename = `${item.imageId}.png`;

      const outputDir = getSetting('output_dir') || './storage/输出';
      const safeName = creationName.replace(/[<>:"/\\|?*]/g, '_');
      const destPath = path.join(outputDir, safeName, date, filename);

      await downloadImage(imgInfo.filename, imgInfo.subfolder, imgInfo.type, destPath);

      updateImageStatus(item.imageId, 'done', destPath, '', elapsed);
      writePromptFile(creationName, date, item.prompt);
      if (creation?.copywriting_md) {
        writeCopywritingFile(creationName, date, creation.copywriting_md);
      }

      broadcast('image:done', {
        imageId: item.imageId, taskId: item.taskId,
        filePath: destPath, elapsedMs: elapsed,
      });
    } catch (err) {
      const elapsed = Date.now() - startTime;
      const errMsg = String(err);
      updateImageStatus(item.imageId, 'failed', '', errMsg, elapsed);
      broadcast('image:failed', {
        imageId: item.imageId, taskId: item.taskId,
        error: errMsg, elapsedMs: elapsed,
      });
    }

    queue.shift();
  }

  processing = false;
  if (currentTaskId) {
    updateTaskStatus(currentTaskId, 'completed');
    broadcast('task:completed', { taskId: currentTaskId });
  }
  currentTaskId = null;
}

async function pollUntilDone(promptId: string, timeoutMs = 300000): Promise<Awaited<ReturnType<typeof getHistory>> & object> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (cancelled) throw new Error('Task cancelled');
    const history = await getHistory(promptId);
    if (history && history.status.completed) {
      return history;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error('ComfyUI prompt timed out');
}

export function cancelTask(taskId: string): void {
  if (currentTaskId === taskId) {
    cancelled = true;
  }
}

export function retryImage(imageId: string): void {
  const db = getDb();
  const result = db.exec(`SELECT * FROM task_images WHERE id = '${imageId}'`);
  if (!result.length) return;

  const cols = result[0].columns;
  const row = result[0].values[0];
  const obj: Record<string, unknown> = {};
  cols.forEach((c: string, i: number) => { obj[c] = row[i]; });

  const creation = getCreation(obj.creation_id as string);
  if (!creation) return;

  const newId = uid();
  db.run(
    `INSERT INTO task_images (id, task_id, creation_id, status, file_path, prompt_snapshot, error, elapsed_ms)
     VALUES (?, ?, ?, 'queued', '', ?, '', 0)`,
    [newId, obj.task_id, obj.creation_id, obj.prompt_snapshot]
  );
  save();

  queue.push({
    imageId: newId,
    taskId: obj.task_id as string,
    creationId: obj.creation_id as string,
    prompt: obj.prompt_snapshot as string,
    width: 1024,
    height: 1024,
  });

  if (!processing) {
    processing = true;
    currentTaskId = obj.task_id as string;
    processQueue();
  }

  broadcast('image:retrying', { imageId: newId, oldImageId: imageId });
}

function updateImageStatus(id: string, status: string, filePath = '', error = '', elapsedMs = 0): void {
  const db = getDb();
  db.run(
    'UPDATE task_images SET status=?, file_path=?, error=?, elapsed_ms=? WHERE id=?',
    [status, filePath, error, elapsedMs, id]
  );
  save();
}

function updateTaskStatus(id: string, status: string): void {
  const db = getDb();
  db.run('UPDATE tasks SET status=? WHERE id=?', [status, id]);
  save();
}

export function listTasks(): Task[] {
  const db = getDb();
  const result = db.exec('SELECT * FROM tasks ORDER BY created_at DESC');
  if (!result.length) return [];
  const cols = result[0].columns;
  return result[0].values.map((row: unknown[]) => {
    const obj: Record<string, unknown> = {};
    cols.forEach((c: string, i: number) => { obj[c] = row[i]; });
    return obj as unknown as Task;
  });
}

export function getTask(id: string): Task | null {
  const db = getDb();
  const result = db.exec(`SELECT * FROM tasks WHERE id = '${id}'`);
  if (!result.length) return null;
  const cols = result[0].columns;
  const row = result[0].values[0];
  const obj: Record<string, unknown> = {};
  cols.forEach((c: string, i: number) => { obj[c] = row[i]; });
  return obj as unknown as Task;
}

export function getTaskImages(taskId: string): TaskImage[] {
  const db = getDb();
  const result = db.exec(`SELECT * FROM task_images WHERE task_id = '${taskId}' ORDER BY rowid`);
  if (!result.length) return [];
  const cols = result[0].columns;
  return result[0].values.map((row: unknown[]) => {
    const obj: Record<string, unknown> = {};
    cols.forEach((c: string, i: number) => { obj[c] = row[i]; });
    return obj as unknown as TaskImage;
  });
}

export function isProcessing(): boolean {
  return processing;
}
