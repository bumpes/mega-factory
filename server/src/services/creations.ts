import { getDb, save } from '../db/sqlite';
import { seedCreations } from '../data/seedCreations';
import { createLLMProvider, type GeneratedCreation } from './llm';

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export interface Creation {
  id: string;
  name: string;
  category: string;
  source: string;
  setting_desc: string;
  copywriting_md: string;
  prompt: string;
  style_tag: string;
  created_at: string;
}

export async function seedIfEmpty(): Promise<number> {
  const db = getDb();
  const stmt = db.prepare('SELECT COUNT(*) as cnt FROM creations');
  stmt.step();
  const row = stmt.getAsObject() as { cnt: number };
  stmt.free();
  if (row.cnt > 0) return 0;

  const now = new Date().toISOString();
  let inserted = 0;
  for (const c of seedCreations) {
    const id = uid();
    db.run(
      `INSERT INTO creations (id, name, category, source, setting_desc, copywriting_md, prompt, style_tag, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, c.name, c.category, c.source, c.setting_desc, c.copywriting_md, c.prompt, c.style_tag, now]
    );
    inserted++;
  }
  save();
  return inserted;
}

export function listCreations(opts?: { keyword?: string; category?: string }): Creation[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: string[] = [];

  if (opts?.keyword) {
    conditions.push('(name LIKE ? OR setting_desc LIKE ? OR style_tag LIKE ?)');
    const kw = `%${opts.keyword}%`;
    params.push(kw, kw, kw);
  }
  if (opts?.category) {
    conditions.push('category = ?');
    params.push(opts.category);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM creations ${where} ORDER BY created_at DESC`;

  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const results: Creation[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as Creation);
  }
  stmt.free();
  return results;
}

export function listCategories(): string[] {
  const db = getDb();
  const result = db.exec('SELECT DISTINCT category FROM creations ORDER BY category');
  if (!result.length) return [];
  return result[0].values.map((r: unknown[]) => r[0] as string);
}

export function getCreation(id: string): Creation | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM creations WHERE id = ?');
  stmt.bind([id]);
  let result: Creation | null = null;
  if (stmt.step()) {
    result = stmt.getAsObject() as unknown as Creation;
  }
  stmt.free();
  return result;
}

export function createCreation(data: Omit<Creation, 'id' | 'created_at'>): Creation {
  const db = getDb();
  const id = uid();
  const now = new Date().toISOString();
  db.run(
    `INSERT INTO creations (id, name, category, source, setting_desc, copywriting_md, prompt, style_tag, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.name, data.category, data.source, data.setting_desc, data.copywriting_md, data.prompt, data.style_tag, now]
  );
  save();
  return { id, created_at: now, ...data };
}

export function updateCreation(id: string, data: Partial<Omit<Creation, 'id' | 'created_at'>>): Creation | null {
  const existing = getCreation(id);
  if (!existing) return null;
  const db = getDb();
  const merged = { ...existing, ...data };
  db.run(
    `UPDATE creations SET name=?, category=?, source=?, setting_desc=?, copywriting_md=?, prompt=?, style_tag=? WHERE id=?`,
    [merged.name, merged.category, merged.source, merged.setting_desc, merged.copywriting_md, merged.prompt, merged.style_tag, id]
  );
  save();
  return getCreation(id);
}

export function deleteCreation(id: string): boolean {
  const db = getDb();
  db.run('DELETE FROM creations WHERE id = ?', [id]);
  save();
  return true;
}

export async function aiGenerateCreations(count: number, styleTemplate: string): Promise<Creation[]> {
  const provider = createLLMProvider();
  const generated: GeneratedCreation[] = await provider.generateCreations(count, styleTemplate);
  const results: Creation[] = [];
  for (const g of generated) {
    results.push(createCreation({
      name: g.name,
      category: g.category,
      source: 'ai',
      setting_desc: g.setting_desc,
      copywriting_md: g.copywriting_md,
      prompt: g.prompt,
      style_tag: g.style_tag,
    }));
  }
  return results;
}
