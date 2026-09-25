import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildWorkflow, loadWorkflowTemplate } from '../services/comfyui';
import { archiveImage, writePromptFile, writeCopywritingFile, scanArchiveTree, getOutputDir } from '../services/archive';
import { createTask, listTasks, getTask, getTaskImages, cancelTask } from '../services/generator';
import { initDb, resetDb } from '../db/sqlite';
import { seedIfEmpty, listCreations } from '../services/creations';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p3.db');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  process.env.OUTPUT_DIR = './storage/test-output';
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  await initDb();
  await seedIfEmpty();
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  const testOutput = path.resolve('./storage/test-output');
  if (fs.existsSync(testOutput)) fs.rmSync(testOutput, { recursive: true, force: true });
});

describe('P3 - ComfyUI workflow', () => {
  it('loads workflow template', () => {
    const template = loadWorkflowTemplate();
    expect(template).toBeTruthy();
    expect(typeof template).toBe('object');
  });

  it('builds workflow with prompt and size', () => {
    const template = loadWorkflowTemplate();
    const wf = buildWorkflow(template, 'test megastructure prompt', 768, 1024, 42);
    const values = Object.values(wf) as Array<{ inputs: Record<string, unknown> }>;

    const textNode = values.find((n) => n.inputs?.text === 'test megastructure prompt');
    expect(textNode).toBeTruthy();

    const sizeNode = values.find((n) => n.inputs?.width === 768 && n.inputs?.height === 1024);
    expect(sizeNode).toBeTruthy();

    const seedNode = values.find((n) => n.inputs?.seed === 42);
    expect(seedNode).toBeTruthy();
  });

  it('generates random seed when not specified', () => {
    const template = loadWorkflowTemplate();
    const wf1 = buildWorkflow(template, 'test', 1024, 1024);
    const wf2 = buildWorkflow(template, 'test', 1024, 1024);
    const values1 = Object.values(wf1) as Array<{ inputs: Record<string, unknown> }>;
    const values2 = Object.values(wf2) as Array<{ inputs: Record<string, unknown> }>;
    const seed1 = values1.find((n) => typeof n.inputs?.seed === 'number')?.inputs?.seed;
    const seed2 = values2.find((n) => typeof n.inputs?.seed === 'number')?.inputs?.seed;
    expect(seed1).not.toBe(seed2);
  });
});

describe('P3 - Archive service', () => {
  it('archives an image to disk', () => {
    const buffer = Buffer.from('fake-png-data');
    const filePath = archiveImage('测试巨构', '2026-09-25', 'test.png', buffer);
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath).toString()).toBe('fake-png-data');
  });

  it('writes prompt file', () => {
    const filePath = writePromptFile('测试巨构', '2026-09-25', 'megastructure epic scale');
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe('megastructure epic scale');
  });

  it('writes copywriting file', () => {
    const filePath = writeCopywritingFile('测试巨构', '2026-09-25', '# 生活化文案\n测试内容');
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toContain('生活化文案');
  });

  it('scans archive tree', () => {
    archiveImage('扫描测试', '2026-09-25', 'scan.png', Buffer.from('data'));
    const tree = scanArchiveTree();
    const found = tree.find((t) => t.creationName === '扫描测试');
    expect(found).toBeTruthy();
    expect(found!.dates).toContain('2026-09-25');
  });
});

describe('P3 - Generator service', () => {
  it('creates a task with images', () => {
    const creations = listCreations();
    const { task, images } = createTask({
      creationIds: [creations[0].id, creations[1].id],
      imagesPerCreation: 2,
      width: 1024,
      height: 1024,
    });
    expect(task.id).toBeTruthy();
    expect(task.status).toBe('running');
    expect(images.length).toBe(4);
    expect(images.every((i) => i.status === 'queued')).toBe(true);
  });

  it('lists tasks', () => {
    const tasks = listTasks();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('gets task by id', () => {
    const tasks = listTasks();
    const task = getTask(tasks[0].id);
    expect(task).not.toBeNull();
    expect(task!.id).toBe(tasks[0].id);
  });

  it('gets task images', () => {
    const tasks = listTasks();
    const images = getTaskImages(tasks[0].id);
    expect(images.length).toBeGreaterThan(0);
  });

  it('cancels a task', () => {
    const creations = listCreations();
    const { task } = createTask({
      creationIds: [creations[0].id],
      imagesPerCreation: 1,
      width: 512,
      height: 512,
    });
    cancelTask(task.id);
  });
});
