import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initDb, resetDb, save, getDb } from '../db/sqlite';
import { seedIfEmpty, listCreations, getCreation, createCreation, updateCreation, deleteCreation, listCategories } from '../services/creations';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p2.db');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  await initDb();
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
});

describe('P2 - Creations service', () => {
  it('seeds at least 100 preset creations on first run', async () => {
    const count = await seedIfEmpty();
    expect(count).toBeGreaterThanOrEqual(100);
  });

  it('does not re-seed when creations already exist', async () => {
    const count = await seedIfEmpty();
    expect(count).toBe(0);
  });

  it('lists all creations', () => {
    const all = listCreations();
    expect(all.length).toBeGreaterThanOrEqual(100);
  });

  it('filters creations by keyword', () => {
    const results = listCreations({ keyword: '戴森' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.name.includes('戴森') || r.setting_desc.includes('戴森'))).toBe(true);
  });

  it('filters creations by category', () => {
    const cats = listCategories();
    expect(cats.length).toBeGreaterThan(0);
    const results = listCreations({ category: cats[0] });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.category === cats[0])).toBe(true);
  });

  it('gets a single creation by id', () => {
    const all = listCreations();
    const c = getCreation(all[0].id);
    expect(c).not.toBeNull();
    expect(c!.name).toBe(all[0].name);
  });

  it('creates a new creation', () => {
    const c = createCreation({
      name: '测试巨构', category: '测试', source: 'user',
      setting_desc: '一个测试用的巨构', copywriting_md: '测试文案', prompt: 'test prompt', style_tag: '测试',
    });
    expect(c.id).toBeTruthy();
    expect(c.name).toBe('测试巨构');
    const fetched = getCreation(c.id);
    expect(fetched).not.toBeNull();
    expect(fetched!.name).toBe('测试巨构');
  });

  it('updates a creation and persists', () => {
    const all = listCreations();
    const c = all[0];
    const updated = updateCreation(c.id, { name: '已更新名称' });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe('已更新名称');
    const fetched = getCreation(c.id);
    expect(fetched!.name).toBe('已更新名称');
  });

  it('deletes a creation', () => {
    const c = createCreation({
      name: '待删除', category: '测试', source: 'user',
      setting_desc: '', copywriting_md: '', prompt: '', style_tag: '',
    });
    deleteCreation(c.id);
    expect(getCreation(c.id)).toBeNull();
  });

  it('preset creations have megastructure keywords in prompts', () => {
    const all = listCreations();
    const presets = all.filter((c) => c.source === 'preset');
    expect(presets.length).toBeGreaterThan(0);
    const withMega = presets.filter((c) =>
      c.prompt.toLowerCase().includes('megastructure') || c.prompt.toLowerCase().includes('epic scale')
    );
    expect(withMega.length).toBe(presets.length);
  });
});
