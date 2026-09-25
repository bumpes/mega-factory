import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify from 'fastify';
import { dashboardRoutes } from '../routes/dashboard';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p6-routes.db');
const TEST_OUTPUT = path.resolve('./storage/test-p6-routes-output');

describe('P6 - Dashboard routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
    await initDb();
    putSetting('output_dir', TEST_OUTPUT);
    putSetting('comfyui_url', 'http://127.0.0.1:19999');
    app = Fastify();
    await app.register(dashboardRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  });

  beforeEach(() => {
    const db = getDb();
    db.run('DELETE FROM creations');
    db.run('DELETE FROM tasks');
    db.run('DELETE FROM task_images');
    db.run('DELETE FROM comparisons');
    save();
  });

  it('GET /api/dashboard returns dashboard data', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/dashboard' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data).toHaveProperty('comfyStatus');
    expect(data).toHaveProperty('creationCount');
    expect(data).toHaveProperty('pendingComparisonCount');
    expect(data).toHaveProperty('runningTasks');
    expect(data).toHaveProperty('recentImages');
    expect(data).toHaveProperty('recentComparisons');
  });

  it('shows ComfyUI offline when unreachable', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/dashboard' });
    const data = JSON.parse(res.payload);
    expect(data.comfyStatus).toBe('offline');
    expect(data.comfyError).toBeTruthy();
  });

  it('returns correct creation count', async () => {
    const db = getDb();
    db.run("INSERT INTO creations (id,name,category,source,setting_desc,copywriting_md,prompt,style_tag,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      ['c1', 'test', 'cat', 'preset', '', '', '', '', new Date().toISOString()]);
    save();

    const res = await app.inject({ method: 'GET', url: '/api/dashboard' });
    const data = JSON.parse(res.payload);
    expect(data.creationCount).toBe(1);
  });

  it('returns running tasks', async () => {
    const db = getDb();
    db.run("INSERT INTO tasks (id,created_at,status,params_json) VALUES (?,?,?,?)",
      ['t1', new Date().toISOString(), 'running', '{}']);
    save();

    const res = await app.inject({ method: 'GET', url: '/api/dashboard' });
    const data = JSON.parse(res.payload);
    expect(data.runningTasks.length).toBe(1);
    expect(data.runningTasks[0].id).toBe('t1');
  });

  it('returns recent images', async () => {
    const db = getDb();
    db.run("INSERT INTO task_images (id,task_id,creation_id,status,file_path,prompt_snapshot,error,elapsed_ms) VALUES (?,?,?,?,?,?,?,?)",
      ['i1', 't1', 'c1', 'done', '/a.png', '', '', 1000]);
    save();

    const res = await app.inject({ method: 'GET', url: '/api/dashboard' });
    const data = JSON.parse(res.payload);
    expect(data.recentImages.length).toBe(1);
  });
});
