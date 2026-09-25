const BASE = '/api';

export interface Task {
  id: string;
  created_at: string;
  status: 'running' | 'completed' | 'cancelled' | 'failed';
  params_json: string;
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

export interface TaskParams {
  creationIds: string[];
  imagesPerCreation: number;
  width: number;
  height: number;
  promptOverride?: string;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks`);
  return res.json();
}

export async function fetchTask(id: string): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`);
  return res.json();
}

export async function fetchTaskImages(taskId: string): Promise<TaskImage[]> {
  const res = await fetch(`${BASE}/tasks/${taskId}/images`);
  return res.json();
}

export async function createTask(params: TaskParams): Promise<{ task: Task; images: TaskImage[] }> {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create task');
  }
  return res.json();
}

export async function cancelTask(id: string): Promise<void> {
  await fetch(`${BASE}/tasks/${id}/cancel`, { method: 'POST' });
}

export async function retryImage(imageId: string): Promise<void> {
  await fetch(`${BASE}/task-images/${imageId}/retry`, { method: 'POST' });
}
