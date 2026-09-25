import fs from 'fs';
import path from 'path';
import { getSetting } from '../config/settings';

export interface ArchiveBatch {
  creationId: string;
  creationName: string;
  date: string;
  files: Array<{ filename: string; content: string | Buffer }>;
}

export function getOutputDir(): string {
  return path.resolve(getSetting('output_dir') || './storage/输出');
}

export function archiveBatch(batch: ArchiveBatch): string {
  const outputDir = getOutputDir();
  const safeName = batch.creationName.replace(/[<>:"/\\|?*]/g, '_');
  const batchDir = path.join(outputDir, safeName, batch.date);

  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  for (const file of batch.files) {
    const filePath = path.join(batchDir, file.filename);
    fs.writeFileSync(filePath, file.content);
  }

  return batchDir;
}

export function archiveImage(creationName: string, date: string, filename: string, buffer: Buffer): string {
  const outputDir = getOutputDir();
  const safeName = creationName.replace(/[<>:"/\\|?*]/g, '_');
  const batchDir = path.join(outputDir, safeName, date);

  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  const filePath = path.join(batchDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

export function writePromptFile(creationName: string, date: string, prompt: string): string {
  const outputDir = getOutputDir();
  const safeName = creationName.replace(/[<>:"/\\|?*]/g, '_');
  const batchDir = path.join(outputDir, safeName, date);

  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  const filePath = path.join(batchDir, '提示词.txt');
  fs.writeFileSync(filePath, prompt, 'utf-8');
  return filePath;
}

export function writeCopywritingFile(creationName: string, date: string, markdown: string): string {
  const outputDir = getOutputDir();
  const safeName = creationName.replace(/[<>:"/\\|?*]/g, '_');
  const batchDir = path.join(outputDir, safeName, date);

  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  const filePath = path.join(batchDir, '文案.md');
  fs.writeFileSync(filePath, markdown, 'utf-8');
  return filePath;
}

export function scanArchiveTree(): Array<{ creationName: string; dates: string[] }> {
  const outputDir = getOutputDir();
  if (!fs.existsSync(outputDir)) return [];

  const results: Array<{ creationName: string; dates: string[] }> = [];
  const entries = fs.readdirSync(outputDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const creationName = entry.name;
    const creationDir = path.join(outputDir, creationName);
    const dateEntries = fs.readdirSync(creationDir, { withFileTypes: true });
    const dates = dateEntries.filter((d) => d.isDirectory()).map((d) => d.name);
    results.push({ creationName, dates });
  }

  return results;
}
