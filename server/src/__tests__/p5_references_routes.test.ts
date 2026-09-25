import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { referencesRoutes } from '../routes/references';
import { initDb, resetDb, getDb, save } from '../db/sqlite';
import { putSetting } from '../config/settings';
import { getReferenceDir } from '../services/references';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p5-routes.db');
const TEST_REF_DIR = path.resolve('./storage/test-p5-routes-ref');

function buildMultipart(fieldName: string, filename: string, content: Buffer): { body: Buffer; boundary: string } {
  const boundary = '----TestBoundary' + Date.now();
  const header = `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  const body = Buffer.concat([Buffer.from(header), content, Buffer.from(footer)]);
  return { body, boundary };
}

describe('P5 - References routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
    await initDb();
    putSetting('reference_dir', TEST_REF_DIR);
    app = Fastify();
    await app.register(multipart);
    await app.register(referencesRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_REF_DIR)) fs.rmSync(TEST_REF_DIR, { recursive: true });
  });

  beforeEach(() => {
    const dir = getReferenceDir();
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f));
    }
    const db = getDb();
    db.run('DELETE FROM "references"');
    save();
  });

  it('GET /api/references returns empty array initially', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/references' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data).toEqual([]);
  });

  it('POST /api/references/upload creates reference', async () => {
    const { body, boundary } = buildMultipart('file', 'test_upload.png', Buffer.from('fake-png-data'));
    const res = await app.inject({
      method: 'POST', url: '/api/references/upload',
      headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
      payload: body,
    });
    expect(res.statusCode).toBe(201);
    const data = JSON.parse(res.payload);
    expect(data.id).toBeTruthy();
    expect(data.file_name).toMatch(/test_upload_\d+\.png$/);

    const listRes = await app.inject({ method: 'GET', url: '/api/references' });
    const list = JSON.parse(listRes.payload);
    expect(list.length).toBe(1);
  });

  it('uploads two files and count increases by 2', async () => {
    for (const name of ['img_a.png', 'img_b.png']) {
      const { body, boundary } = buildMultipart('file', name, Buffer.from('data'));
      await app.inject({
        method: 'POST', url: '/api/references/upload',
        headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
        payload: body,
      });
    }
    const res = await app.inject({ method: 'GET', url: '/api/references' });
    const list = JSON.parse(res.payload);
    expect(list.length).toBe(2);
  });

  it('PUT /api/references/:id/feature-card saves card', async () => {
    const { body, boundary } = buildMultipart('file', 'card.png', Buffer.from('data'));
    const uploadRes = await app.inject({
      method: 'POST', url: '/api/references/upload',
      headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
      payload: body,
    });
    const ref = JSON.parse(uploadRes.payload);

    const res = await app.inject({
      method: 'PUT', url: `/api/references/${ref.id}/feature-card`,
      payload: { feat_scale: 5, feat_composition: 4, feat_light: 3, feat_detail: 4, feat_material: 5, feat_mood: 4, feat_color: 3, highlight_note: '测试备注' },
    });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.feat_scale).toBe(5);
    expect(data.highlight_note).toBe('测试备注');
  });

  it('feature card persists across simulated restart', async () => {
    const { body, boundary } = buildMultipart('file', 'persist.png', Buffer.from('data'));
    const uploadRes = await app.inject({
      method: 'POST', url: '/api/references/upload',
      headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
      payload: body,
    });
    const ref = JSON.parse(uploadRes.payload);

    await app.inject({
      method: 'PUT', url: `/api/references/${ref.id}/feature-card`,
      payload: { feat_scale: 3, feat_composition: 3, feat_light: 3, feat_detail: 3, feat_material: 3, feat_mood: 3, feat_color: 3, highlight_note: '持久化' },
    });

    const getRes = await app.inject({ method: 'GET', url: `/api/references/${ref.id}` });
    const data = JSON.parse(getRes.payload);
    expect(data.feat_scale).toBe(3);
    expect(data.highlight_note).toBe('持久化');
  });

  it('DELETE /api/references/:id removes reference', async () => {
    const { body, boundary } = buildMultipart('file', 'del.png', Buffer.from('data'));
    const uploadRes = await app.inject({
      method: 'POST', url: '/api/references/upload',
      headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
      payload: body,
    });
    const ref = JSON.parse(uploadRes.payload);

    const res = await app.inject({ method: 'DELETE', url: `/api/references/${ref.id}` });
    expect(res.statusCode).toBe(200);

    const getRes = await app.inject({ method: 'GET', url: `/api/references/${ref.id}` });
    expect(getRes.statusCode).toBe(404);
  });
});
