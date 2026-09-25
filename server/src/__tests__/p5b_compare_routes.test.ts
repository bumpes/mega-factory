import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify from 'fastify';
import { compareRoutes } from '../routes/compare';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import { saveUpload, upsertFeatureCard } from '../services/references';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p5b-routes.db');
const TEST_OUTPUT = path.resolve('./storage/test-p5b-routes-output');
const TEST_REF_DIR = path.resolve('./storage/test-p5b-routes-ref');

const scoreA = { feat_scale: 5, feat_composition: 4, feat_light: 3, feat_detail: 4, feat_material: 5, feat_mood: 4, feat_color: 3 };
const scoreB = { feat_scale: 3, feat_composition: 4, feat_light: 5, feat_detail: 2, feat_material: 4, feat_mood: 3, feat_color: 4 };

describe('P5b - Compare routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
    if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
    await initDb();
    putSetting('output_dir', TEST_OUTPUT);
    putSetting('reference_dir', TEST_REF_DIR);
    app = Fastify();
    await app.register(compareRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
    if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
  });

  beforeEach(() => {
    const db = getDb();
    db.run('DELETE FROM comparisons');
    save();
  });

  it('GET /api/compare/history returns empty array', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/compare/history' });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual([]);
  });

  it('POST /api/compare creates comparison', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/compare',
      payload: { creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: '测试' },
    });
    expect(res.statusCode).toBe(201);
    const data = JSON.parse(res.payload);
    expect(data.id).toBeTruthy();
  });

  it('GET /api/compare/history returns saved comparisons', async () => {
    await app.inject({
      method: 'POST', url: '/api/compare',
      payload: { creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: '' },
    });
    const res = await app.inject({ method: 'GET', url: '/api/compare/history' });
    const data = JSON.parse(res.payload);
    expect(data.length).toBe(1);
  });

  it('POST /api/compare/compute-diff returns diff', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/compare/compute-diff',
      payload: { scoreA, scoreB },
    });
    expect(res.statusCode).toBe(200);
    const diff = JSON.parse(res.payload);
    expect(diff.feat_scale).toBe(2);
    expect(diff.feat_composition).toBe(0);
  });

  it('GET /api/compare/prefill/:refId returns feature card', async () => {
    const ref = saveUpload('prefill.png', Buffer.from('data'));
    upsertFeatureCard(ref.id, {
      feat_scale: 4, feat_composition: 3, feat_light: 5,
      feat_detail: 2, feat_material: 4, feat_mood: 3, feat_color: 5,
      highlight_note: '',
    });
    const res = await app.inject({ method: 'GET', url: `/api/compare/prefill/${ref.id}` });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.feat_scale).toBe(4);
  });

  it('GET /api/compare/:id returns comparison', async () => {
    const createRes = await app.inject({
      method: 'POST', url: '/api/compare',
      payload: { creationId: 'c1', genImagePath: '/a.png', refId: 'r1', scoreA, scoreB, note: '获取测试' },
    });
    const created = JSON.parse(createRes.payload);
    const res = await app.inject({ method: 'GET', url: `/api/compare/${created.id}` });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.note).toBe('获取测试');
  });
});
