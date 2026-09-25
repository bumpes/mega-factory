import { getDb, save } from '../db/sqlite';

export interface Settings {
  comfyui_url: string;
  llm_provider: string;
  llm_api_key: string;
  llm_model: string;
  llm_deep_think: boolean;
  output_dir: string;
  reference_dir: string;
  default_count: number;
  default_resolution: string;
  style_template: string;
}

const DEFAULTS: Settings = {
  comfyui_url: 'http://127.0.0.1:8188',
  llm_provider: 'yuanbao',
  llm_api_key: '',
  llm_model: 'yuanbao-deep-think',
  llm_deep_think: true,
  output_dir: './storage/输出',
  reference_dir: './storage/参考图库',
  default_count: 3,
  default_resolution: '1024x1024',
  style_template: 'epic megastructure, overwhelming colossal scale, awe-inspiring monumental architecture, cosmic proportions that dwarf human comprehension',
};

export function getSetting<T extends keyof Settings>(key: T): Settings[T] {
  const db = getDb();
  const stmt = db.prepare('SELECT value FROM settings WHERE key = ?');
  stmt.bind([key]);
  if (stmt.step()) {
    const row = stmt.getAsObject() as { value: string };
    stmt.free();
    try {
      return JSON.parse(row.value) as Settings[T];
    } catch {
      return row.value as unknown as Settings[T];
    }
  }
  stmt.free();
  return DEFAULTS[key];
}

export function putSetting<T extends keyof Settings>(key: T, value: Settings[T]): void {
  const db = getDb();
  const serialized = JSON.stringify(value);
  db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, serialized]);
  save();
}

export function getAllSettings(): Settings {
  const result = { ...DEFAULTS };
  const db = getDb();
  const stmt = db.prepare('SELECT key, value FROM settings');
  while (stmt.step()) {
    const row = stmt.getAsObject() as { key: string; value: string };
    const k = row.key as keyof Settings;
    if (k in DEFAULTS) {
      try {
        (result as Record<string, unknown>)[k] = JSON.parse(row.value);
      } catch {
        (result as Record<string, unknown>)[k] = row.value;
      }
    }
  }
  stmt.free();
  return result;
}

export function putAllSettings(settings: Partial<Settings>): void {
  for (const [key, value] of Object.entries(settings)) {
    if (key in DEFAULTS) {
      putSetting(key as keyof Settings, value as Settings[keyof Settings]);
    }
  }
}
