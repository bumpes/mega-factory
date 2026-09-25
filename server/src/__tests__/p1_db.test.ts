import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initDb, getDb, save, resetDb } from '../db/sqlite';

const TEST_DB = path.resolve('./storage/test_p1.db');

describe('P1 - Database', () => {
  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    resetDb();
    await initDb();
  });

  afterAll(() => {
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    delete process.env.DB_PATH;
  });

  it('creates database file on init', () => {
    expect(fs.existsSync(TEST_DB)).toBe(true);
  });

  it('creates all required tables', () => {
    const db = getDb();
    const tables = ['settings', 'creations', 'tasks', 'task_images', 'references', 'comparisons'];
    for (const table of tables) {
      const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`);
      expect(stmt.step()).toBe(true);
      stmt.free();
    }
  });

  it('save() persists data to disk', () => {
    const db = getDb();
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('test_key', '\"test_value\"')");
    save();
    expect(fs.existsSync(TEST_DB)).toBe(true);
    const stat = fs.statSync(TEST_DB);
    expect(stat.size).toBeGreaterThan(0);
  });
});
