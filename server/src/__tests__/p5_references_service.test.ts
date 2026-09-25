import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import { saveUpload, listReferences, getReference, deleteReference, upsertFeatureCard, normalizeFileName, getReferenceDir } from '../services/references';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p5-refs.db');
const TEST_REF_DIR = path.resolve('./storage/test-p5-refs');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
  await initDb();
  putSetting('reference_dir', TEST_REF_DIR);
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
});

describe('P5 - References service', () => {
  beforeEach(() => {
    const dir = getReferenceDir();
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const f of files) fs.unlinkSync(path.join(dir, f));
    }
    const db = getDb();
    db.run('DELETE FROM "references"');
    save();
  });

  it('normalizes file names', () => {
    const name = normalizeFileName('my image (1).png');
    expect(name).toMatch(/^my_image_1_\d+\.png$/);
  });

  it('normalizes Chinese file names', () => {
    const name = normalizeFileName('巨构参考图.jpg');
    expect(name).toMatch(/巨构参考图_\d+\.jpg$/);
  });

  it('saves upload and returns reference', () => {
    const ref = saveUpload('test.png', Buffer.from('fake-image'));
    expect(ref.id).toBeTruthy();
    expect(ref.file_name).toMatch(/test_\d+\.png$/);
    expect(fs.existsSync(ref.file_path)).toBe(true);
  });

  it('lists references in descending order', () => {
    saveUpload('a.png', Buffer.from('a'));
    saveUpload('b.png', Buffer.from('b'));
    const list = listReferences();
    expect(list.length).toBe(2);
  });

  it('gets a reference by id', () => {
    const created = saveUpload('test.png', Buffer.from('data'));
    const fetched = getReference(created.id);
    expect(fetched).not.toBeNull();
    expect(fetched!.file_name).toBe(created.file_name);
  });

  it('deletes reference and removes file', () => {
    const ref = saveUpload('del.png', Buffer.from('data'));
    expect(fs.existsSync(ref.file_path)).toBe(true);
    const ok = deleteReference(ref.id);
    expect(ok).toBe(true);
    expect(fs.existsSync(ref.file_path)).toBe(false);
    expect(getReference(ref.id)).toBeNull();
  });

  it('upserts feature card and persists', () => {
    const ref = saveUpload('card.png', Buffer.from('data'));
    const updated = upsertFeatureCard(ref.id, {
      feat_scale: 5, feat_composition: 4, feat_light: 3,
      feat_detail: 4, feat_material: 5, feat_mood: 4, feat_color: 3,
      highlight_note: '巨构尺度感强',
    });
    expect(updated).not.toBeNull();
    expect(updated!.feat_scale).toBe(5);
    expect(updated!.highlight_note).toBe('巨构尺度感强');

    const fetched = getReference(ref.id);
    expect(fetched!.feat_composition).toBe(4);
  });

  it('returns null for upsert on missing ref', () => {
    const result = upsertFeatureCard('nonexistent', {
      feat_scale: 1, feat_composition: 1, feat_light: 1,
      feat_detail: 1, feat_material: 1, feat_mood: 1, feat_color: 1,
      highlight_note: '',
    });
    expect(result).toBeNull();
  });
});
