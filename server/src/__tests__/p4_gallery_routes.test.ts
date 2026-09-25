import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify from 'fastify';
import { galleryRoutes } from '../routes/gallery';
import { initDb, resetDb } from '../db/sqlite';
import { putSetting } from '../config/settings';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p4-routes.db');
const TEST_OUTPUT = path.resolve('./storage/test-p4-routes-output');

function setupFixtures() {
  const batch = path.join(TEST_OUTPUT, '测试巨构', '2026-03-01');
  fs.mkdirSync(batch, { recursive: true });
  fs.writeFileSync(path.join(batch, 'render.png'), 'fake-image-data');
  fs.writeFileSync(path.join(batch, '提示词.txt'), 'epic megastructure prompt');
  fs.writeFileSync(path.join(batch, '文案.md'), '# 巨构文案内容');
}

describe('P4 - Gallery routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
    await initDb();
    putSetting('output_dir', TEST_OUTPUT);
    setupFixtures();
    app = Fastify();
    await app.register(galleryRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    if (fs.existsSync(TEST_OUTPUT)) fs.rmSync(TEST_OUTPUT, { recursive: true });
  });

  it('GET /api/gallery returns tree', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/gallery' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0].creationName).toBe('测试巨构');
    expect(data[0].dates).toContain('2026-03-01');
  });

  it('GET /api/gallery/:creation/:date returns batch', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/gallery/测试巨构/2026-03-01' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.creationName).toBe('测试巨构');
    expect(data.images.length).toBe(1);
    expect(data.hasPrompt).toBe(true);
    expect(data.hasCopywriting).toBe(true);
  });

  it('GET /api/gallery/:creation/:date returns 404 for missing', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/gallery/不存在/2099-01-01' });
    expect(res.statusCode).toBe(404);
  });

  it('GET /api/gallery/:creation/:date/:filename returns text content', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/gallery/测试巨构/2026-03-01/提示词.txt' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.content).toBe('epic megastructure prompt');
  });

  it('GET /api/gallery/image serves image file', async () => {
    const imgPath = path.join(TEST_OUTPUT, '测试巨构', '2026-03-01', 'render.png');
    const res = await app.inject({ method: 'GET', url: `/api/gallery/image?path=${encodeURIComponent(imgPath)}` });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('image/png');
  });

  it('GET /api/gallery/image rejects path outside output dir', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/gallery/image?path=' + encodeURIComponent('/etc/passwd') });
    expect(res.statusCode).toBe(403);
  });

  it('POST /api/gallery/zip returns zip', async () => {
    const imgPath = path.join(TEST_OUTPUT, '测试巨构', '2026-03-01', 'render.png');
    const res = await app.inject({
      method: 'POST', url: '/api/gallery/zip',
      payload: { paths: [imgPath] },
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/zip');
  });
});
