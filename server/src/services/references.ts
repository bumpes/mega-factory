import fs from 'fs';
import path from 'path';
import { getSetting } from '../config/settings';
import { getDb, save } from '../db/sqlite';

export interface Reference {
  id: string;
  file_name: string;
  file_path: string;
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
  highlight_note: string;
  created_at: string;
}

export interface FeatureCard {
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
  highlight_note: string;
}

export function getReferenceDir(): string {
  return path.resolve(getSetting('reference_dir') || './storage/参考图库');
}

export function normalizeFileName(original: string): string {
  const ext = path.extname(original).toLowerCase();
  const base = path.basename(original, ext);
  const sanitized = base.replace(/[^\w\u4e00-\u9fff-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
  const ts = Date.now();
  return `${sanitized || 'ref'}_${ts}${ext}`;
}

export function saveUpload(originalName: string, buffer: Buffer): Reference {
  const dir = getReferenceDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const fileName = normalizeFileName(originalName);
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, buffer);

  const db = getDb();
  const id = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  db.run(
    `INSERT INTO "references" (id, file_name, file_path, feat_scale, feat_composition, feat_light, feat_detail, feat_material, feat_mood, feat_color, highlight_note, created_at)
     VALUES (?, ?, ?, 0, 0, 0, 0, 0, 0, 0, '', ?)`,
    [id, fileName, filePath, now]
  );
  save();

  return getReference(id)!;
}

export function listReferences(): Reference[] {
  const db = getDb();
  const results: Reference[] = [];
  const stmt = db.prepare('SELECT * FROM "references" ORDER BY created_at DESC');
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as Reference);
  }
  stmt.free();
  return results;
}

export function getReference(id: string): Reference | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM "references" WHERE id = ?');
  stmt.bind([id]);
  let result: Reference | null = null;
  if (stmt.step()) {
    result = stmt.getAsObject() as unknown as Reference;
  }
  stmt.free();
  return result;
}

export function deleteReference(id: string): boolean {
  const ref = getReference(id);
  if (!ref) return false;
  if (fs.existsSync(ref.file_path)) fs.unlinkSync(ref.file_path);
  const db = getDb();
  db.run('DELETE FROM "references" WHERE id = ?', [id]);
  save();
  return true;
}

export function upsertFeatureCard(id: string, card: FeatureCard): Reference | null {
  const ref = getReference(id);
  if (!ref) return null;
  const db = getDb();
  db.run(
    `UPDATE "references" SET feat_scale=?, feat_composition=?, feat_light=?, feat_detail=?, feat_material=?, feat_mood=?, feat_color=?, highlight_note=? WHERE id=?`,
    [card.feat_scale, card.feat_composition, card.feat_light, card.feat_detail, card.feat_material, card.feat_mood, card.feat_color, card.highlight_note, id]
  );
  save();
  return getReference(id);
}
