import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import { getDashboard } from '../services/dashboard';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p6-dashboard.db');
const TEST_OUTPUT = path.resolve('./storage/test-p6-output');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  await initDb();
  putSetting('output_dir', TEST_OUTPUT);
  putSetting('comfyui_url', 'http://127.0.0.1:19999');
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
});

describe('P6 - Dashboard service', () => {
  beforeEach(() => {
    const db = getDb();
    db.run('DELETE FROM creations');
    db.run('DELETE FROM tasks');
    db.run('DELETE FROM task_images');
    db.run('DELETE FROM comparisons');
    save();
  });

  it('returns dashboard with correct counts', async () => {
    const db = getDb();
    db.run("INSERT INTO creations (id,name,category,source,setting_desc,copywriting_md,prompt,style_tag,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      ['c1', 'test', 'cat', 'preset', '', '', '', '', new Date().toISOString()]);
    db.run("INSERT INTO creations (id,name,category,source,setting_desc,copywriting_md,prompt,style_tag,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      ['c2', 'test2', 'cat', 'preset', '', '', '', '', new Date().toISOString()]);
    save();

    const dash = await getDashboard();
    expect(dash.creationCount).toBe(2);
    expect(dash.comfyStatus).toBe('offline');
  });

  it('shows ComfyUI offline when not reachable', async () => {
    const dash = await getDashboard();
    expect(dash.comfyStatus).toBe('offline');
    expect(dash.comfyError).toBeTruthy();
  });

  it('counts running tasks', async () => {
    const db = getDb();
    db.run("INSERT INTO tasks (id,created_at,status,params_json) VALUES (?,?,?,?)",
      ['t1', new Date().toISOString(), 'running', '{}']);
    save();

    const dash = await getDashboard();
    expect(dash.runningTasks.length).toBe(1);
    expect(dash.runningTasks[0].id).toBe('t1');
  });

  it('counts pending comparisons (images - comparisons)', async () => {
    const db = getDb();
    db.run("INSERT INTO task_images (id,task_id,creation_id,status,file_path,prompt_snapshot,error,elapsed_ms) VALUES (?,?,?,?,?,?,?,?)",
      ['i1', 't1', 'c1', 'done', '/a.png', '', '', 1000]);
    db.run("INSERT INTO task_images (id,task_id,creation_id,status,file_path,prompt_snapshot,error,elapsed_ms) VALUES (?,?,?,?,?,?,?,?)",
      ['i2', 't1', 'c1', 'done', '/b.png', '', '', 1000]);
    save();

    const dash = await getDashboard();
    expect(dash.pendingComparisonCount).toBe(2);
  });

  it('returns recent images and comparisons', async () => {
    const db = getDb();
    db.run("INSERT INTO task_images (id,task_id,creation_id,status,file_path,prompt_snapshot,error,elapsed_ms) VALUES (?,?,?,?,?,?,?,?)",
      ['i1', 't1', 'c1', 'done', '/a.png', '', '', 1000]);
    db.run("INSERT INTO comparisons (id,creation_id,gen_image_path,ref_id,score_a_json,score_b_json,diff_json,note,report_md_path,report_json_path,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      ['cmp1', 'c1', '/a.png', 'r1', '{}', '{}', '{}', 'note', '', '', new Date().toISOString()]);
    save();

    const dash = await getDashboard();
    expect(dash.recentImages.length).toBe(1);
    expect(dash.recentComparisons.length).toBe(1);
  });
});
