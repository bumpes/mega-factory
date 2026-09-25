import fs from 'fs';
import path from 'path';
import { getSetting } from '../config/settings';
import { getDb } from '../db/sqlite';

export interface GalleryBatch {
  creationName: string;
  date: string;
  dirPath: string;
  images: GalleryImage[];
  hasPrompt: boolean;
  hasCopywriting: boolean;
}

export interface GalleryImage {
  filename: string;
  filePath: string;
  compared: boolean;
  totalScore?: number;
}

export function getOutputDir(): string {
  return path.resolve(getSetting('output_dir') || './storage/输出');
}

export function scanArchiveTree(): Array<{ creationName: string; dates: string[] }> {
  const outputDir = getOutputDir();
  if (!fs.existsSync(outputDir)) return [];

  const results: Array<{ creationName: string; dates: string[] }> = [];
  const entries = fs.readdirSync(outputDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const creationDir = path.join(outputDir, entry.name);
    const dateEntries = fs.readdirSync(creationDir, { withFileTypes: true });
    const dates = dateEntries.filter((d) => d.isDirectory()).map((d) => d.name).sort().reverse();
    if (dates.length > 0) {
      results.push({ creationName: entry.name, dates });
    }
  }

  return results;
}

export function listBatch(creationName: string, date: string): GalleryBatch | null {
  const outputDir = getOutputDir();
  const batchDir = path.join(outputDir, creationName, date);
  if (!fs.existsSync(batchDir)) return null;

  const files = fs.readdirSync(batchDir);
  const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));

  const hasPrompt = files.includes('提示词.txt');
  const hasCopywriting = files.includes('文案.md');

  const db = getDb();
  const images: GalleryImage[] = imageFiles.map((filename) => {
    const filePath = path.join(batchDir, filename);
    const stmt = db.prepare('SELECT id, score_a_json FROM comparisons WHERE gen_image_path = ?');
    stmt.bind([filePath]);
    const compared = stmt.step();
    let totalScore: number | undefined;
    if (compared) {
      const row = stmt.getAsObject() as { score_a_json?: string };
      try {
        const scoreA = JSON.parse(row.score_a_json || '{}') as Record<string, number>;
        totalScore = Object.values(scoreA).reduce((a, b) => a + b, 0);
      } catch {
        // ignore
      }
    }
    stmt.free();
    return { filename, filePath, compared, totalScore };
  });

  return { creationName, date, dirPath: batchDir, images, hasPrompt, hasCopywriting };
}

export function readTextFile(creationName: string, date: string, filename: string): string | null {
  if (filename.includes('/') || filename.includes('\\') || filename.includes('..')) return null;
  const outputDir = getOutputDir();
  const filePath = path.join(outputDir, creationName, date, filename);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(outputDir))) return null;
  if (!fs.existsSync(resolved)) return null;
  return fs.readFileSync(resolved, 'utf-8');
}
