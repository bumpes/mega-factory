import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initDb, resetDb } from '../db/sqlite';
import { scanArchiveTree, listBatch, readTextFile } from '../services/gallery';
import { putSetting } from '../config/settings';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p4-gallery.db');
const TEST_OUTPUT = path.resolve('./storage/test-p4-output');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  await initDb();
  putSetting('output_dir', TEST_OUTPUT);
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
});

function setupFixtures() {
  const batch1 = path.join(TEST_OUTPUT, '戴森球', '2026-01-01');
  fs.mkdirSync(batch1, { recursive: true });
  fs.writeFileSync(path.join(batch1, 'img1.png'), 'fake-png');
  fs.writeFileSync(path.join(batch1, 'img2.jpg'), 'fake-jpg');
  fs.writeFileSync(path.join(batch1, '提示词.txt'), 'test prompt content');
  fs.writeFileSync(path.join(batch1, '文案.md'), '# 测试文案');

  const batch2 = path.join(TEST_OUTPUT, '环形世界', '2026-02-15');
  fs.mkdirSync(batch2, { recursive: true });
  fs.writeFileSync(path.join(batch2, 'photo.webp'), 'fake-webp');
}

describe('P4 - Gallery service', () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  });

  it('returns empty array when output dir does not exist', () => {
    const tree = scanArchiveTree();
    expect(tree).toEqual([]);
  });

  it('scans archive tree with creation names and dates', () => {
    setupFixtures();
    const tree = scanArchiveTree();
    expect(tree.length).toBe(2);
    const dyson = tree.find((t) => t.creationName === '戴森球');
    expect(dyson).toBeDefined();
    expect(dyson!.dates).toContain('2026-01-01');
  });

  it('lists batch images with metadata', () => {
    setupFixtures();
    const batch = listBatch('戴森球', '2026-01-01');
    expect(batch).not.toBeNull();
    expect(batch!.images.length).toBe(2);
    expect(batch!.hasPrompt).toBe(true);
    expect(batch!.hasCopywriting).toBe(true);
    expect(batch!.images[0].compared).toBe(false);
  });

  it('returns null for missing batch', () => {
    setupFixtures();
    const batch = listBatch('不存在', '2099-01-01');
    expect(batch).toBeNull();
  });

  it('reads text files from batch directory', () => {
    setupFixtures();
    const content = readTextFile('戴森球', '2026-01-01', '提示词.txt');
    expect(content).toBe('test prompt content');
  });

  it('returns null for missing text file', () => {
    setupFixtures();
    const content = readTextFile('戴森球', '2026-01-01', '不存在.txt');
    expect(content).toBeNull();
  });

  it('rejects path traversal in readTextFile', () => {
    setupFixtures();
    const content = readTextFile('戴森球', '2026-01-01', '../../../etc/passwd');
    expect(content).toBeNull();
  });
});
