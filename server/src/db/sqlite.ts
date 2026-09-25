import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

let db: Database | null = null;

function getDbPath(): string {
  return path.resolve(process.env.DB_PATH || './storage/app.db');
}

export async function initDb(): Promise<Database> {
  if (db) return db;

  const DB_PATH = getDbPath();
  const SQL = await initSqlJs();
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS creations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT '',
      source TEXT NOT NULL DEFAULT 'preset',
      setting_desc TEXT NOT NULL DEFAULT '',
      copywriting_md TEXT NOT NULL DEFAULT '',
      prompt TEXT NOT NULL DEFAULT '',
      style_tag TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'running',
      params_json TEXT NOT NULL DEFAULT '{}'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS task_images (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      creation_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'queued',
      file_path TEXT NOT NULL DEFAULT '',
      prompt_snapshot TEXT NOT NULL DEFAULT '',
      error TEXT NOT NULL DEFAULT '',
      elapsed_ms INTEGER NOT NULL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "references" (
      id TEXT PRIMARY KEY,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      feat_scale INTEGER NOT NULL DEFAULT 0,
      feat_composition INTEGER NOT NULL DEFAULT 0,
      feat_light INTEGER NOT NULL DEFAULT 0,
      feat_detail INTEGER NOT NULL DEFAULT 0,
      feat_material INTEGER NOT NULL DEFAULT 0,
      feat_mood INTEGER NOT NULL DEFAULT 0,
      feat_color INTEGER NOT NULL DEFAULT 0,
      highlight_note TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comparisons (
      id TEXT PRIMARY KEY,
      creation_id TEXT NOT NULL,
      gen_image_path TEXT NOT NULL,
      ref_id TEXT NOT NULL,
      score_a_json TEXT NOT NULL DEFAULT '{}',
      score_b_json TEXT NOT NULL DEFAULT '{}',
      diff_json TEXT NOT NULL DEFAULT '{}',
      note TEXT NOT NULL DEFAULT '',
      report_md_path TEXT NOT NULL DEFAULT '',
      report_json_path TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);

  save();
  return db;
}

export function getDb(): Database {
  if (!db) throw new Error('Database not initialized. Call initDb() first.');
  return db;
}

export function save(): void {
  if (!db) return;
  const DB_PATH = getDbPath();
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

export function resetDb(): void {
  db = null;
}
