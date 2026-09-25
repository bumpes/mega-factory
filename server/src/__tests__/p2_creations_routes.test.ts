import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { creationsRoutes } from '../routes/creations';
import { initDb, resetDb } from '../db/sqlite';
import { seedIfEmpty } from '../services/creations';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p2-routes.db');

describe('P2 - Creations routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    await initDb();
    await seedIfEmpty();
    app = Fastify();
    await app.register(creationsRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  });

  it('GET /api/creations returns array', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/creations' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(100);
  });

  it('GET /api/creations?keyword=戴森 filters results', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/creations?keyword=戴森' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.length).toBeGreaterThan(0);
  });

  it('GET /api/creations/categories returns categories', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/creations/categories' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('GET /api/creations/:id returns single creation', async () => {
    const listRes = await app.inject({ method: 'GET', url: '/api/creations' });
    const all = JSON.parse(listRes.payload);
    const id = all[0].id;

    const res = await app.inject({ method: 'GET', url: `/api/creations/${id}` });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.id).toBe(id);
  });

  it('GET /api/creations/:id returns 404 for missing', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/creations/nonexistent' });
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/creations creates new creation', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/creations',
      payload: { name: '路由测试创意', category: '测试', source: 'user', setting_desc: 'desc', copywriting_md: 'md', prompt: 'p', style_tag: 's' },
    });
    expect(res.statusCode).toBe(201);
    const data = JSON.parse(res.payload);
    expect(data.name).toBe('路由测试创意');
    expect(data.id).toBeTruthy();
  });

  it('PUT /api/creations/:id updates creation', async () => {
    const listRes = await app.inject({ method: 'GET', url: '/api/creations' });
    const all = JSON.parse(listRes.payload);
    const id = all[0].id;

    const res = await app.inject({
      method: 'PUT', url: `/api/creations/${id}`,
      payload: { name: '路由更新名称' },
    });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.name).toBe('路由更新名称');
  });

  it('DELETE /api/creations/:id deletes creation', async () => {
    const createRes = await app.inject({
      method: 'POST', url: '/api/creations',
      payload: { name: '待删除路由', category: '测试', source: 'user', setting_desc: '', copywriting_md: '', prompt: '', style_tag: '' },
    });
    const created = JSON.parse(createRes.payload);

    const res = await app.inject({ method: 'DELETE', url: `/api/creations/${created.id}` });
    expect(res.statusCode).toBe(200);

    const getRes = await app.inject({ method: 'GET', url: `/api/creations/${created.id}` });
    expect(getRes.statusCode).toBe(404);
  });
});
