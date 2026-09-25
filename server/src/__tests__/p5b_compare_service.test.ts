import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import { saveUpload } from '../services/references';
import {
  saveComparison, listHistory, getComparison,
  pickRefRandom, pickRefById, prefillBFromFeatureCard,
  computeDiff,
} from '../services/compare';
import { upsertFeatureCard } from '../services/references';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p5b-compare.db');
const TEST_OUTPUT = path.resolve('./storage/test-p5b-output');
const TEST_REF_DIR = path.resolve('./storage/test-p5b-refs');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
  await initDb();
  putSetting('output_dir', TEST_OUTPUT);
  putSetting('reference_dir', TEST_REF_DIR);
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
});

const scoreA = { feat_scale: 5, feat_composition: 4, feat_light: 3, feat_detail: 4, feat_material: 5, feat_mood: 4, feat_color: 3 };
const scoreB = { feat_scale: 3, feat_composition: 4, feat_light: 5, feat_detail: 2, feat_material: 4, feat_mood: 3, feat_color: 4 };

describe('P5b - Compare service', () => {
  beforeEach(() => {
    const db = getDb();
    db.run('DELETE FROM comparisons');
    save();
  });

  it('computes diff between two score cards', () => {
    const diff = computeDiff(scoreA, scoreB);
    expect(diff.feat_scale).toBe(2);
    expect(diff.feat_composition).toBe(0);
    expect(diff.feat_light).toBe(2);
  });

  it('saves comparison and generates report files', () => {
    const cmp = saveComparison({
      creationId: 'c1', genImagePath: '/tmp/gen.png', refId: 'r1',
      scoreA, scoreB, note: '测试比较',
    });
    expect(cmp.id).toBeTruthy();
    expect(fs.existsSync(cmp.report_md_path)).toBe(true);
    expect(fs.existsSync(cmp.report_json_path)).toBe(true);
    const md = fs.readFileSync(cmp.report_md_path, 'utf-8');
    expect(md).toContain('比较报告');
    expect(md).toContain('测试比较');
  });

  it('report json contains warnings for diff >= 2', () => {
    const cmp = saveComparison({
      creationId: 'c2', genImagePath: '/tmp/gen2.png', refId: 'r2',
      scoreA, scoreB, note: '',
    });
    const json = JSON.parse(fs.readFileSync(cmp.report_json_path, 'utf-8'));
    expect(json.warnings.length).toBeGreaterThan(0);
    expect(json.warnings).toContain('feat_scale');
  });

  it('lists history', () => {
    saveComparison({ creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: '' });
    saveComparison({ creationId: 'c2', genImagePath: '/b.png', refId: 'r2', scoreA, scoreB, note: '' });
    const all = listHistory();
    expect(all.length).toBe(2);
    const filtered = listHistory('c1');
    expect(filtered.length).toBe(1);
  });

  it('gets comparison by id', () => {
    const cmp = saveComparison({ creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: 'test' });
    const fetched = getComparison(cmp.id);
    expect(fetched).not.toBeNull();
    expect(fetched!.note).toBe('test');
  });

  it('picks random reference', () => {
    const ref = saveUpload('ref.png', Buffer.from('data'));
    const picked = pickRefRandom();
    expect(picked).not.toBeNull();
    expect(picked!.id).toBe(ref.id);
  });

  it('picks reference by id', () => {
    const ref = saveUpload('ref2.png', Buffer.from('data'));
    const picked = pickRefById(ref.id);
    expect(picked).not.toBeNull();
    expect(picked!.id).toBe(ref.id);
  });

  it('prefills B from feature card', () => {
    const ref = saveUpload('card.png', Buffer.from('data'));
    upsertFeatureCard(ref.id, {
      feat_scale: 5, feat_composition: 4, feat_light: 3,
      feat_detail: 4, feat_material: 5, feat_mood: 4, feat_color: 3,
      highlight_note: '',
    });
    const card = prefillBFromFeatureCard(ref.id);
    expect(card).not.toBeNull();
    expect(card!.feat_scale).toBe(5);
  });

  it('comparison status flows back to gallery (comparison exists in DB)', () => {
    const cmp = saveComparison({
      creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: '',
    });
    const fetched = getComparison(cmp.id);
    expect(fetched).not.toBeNull();
    const scoreAObj = JSON.parse(fetched!.score_a_json);
    const total = Object.values(scoreAObj).reduce((a: number, b: unknown) => a + (b as number), 0);
    expect(total).toBe(28);
  });
});
