import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { tasksRoutes } from '../routes/tasks';
import { initDb, resetDb } from '../db/sqlite';
import { seedIfEmpty, listCreations } from '../services/creations';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-p3-routes.db');

describe('P3 - Task routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    process.env.OUTPUT_DIR = './storage/test-p3-output';
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    await initDb();
    await seedIfEmpty();
    app = Fastify();
    await app.register(tasksRoutes);
  });

  afterAll(async () => {
    await app.close();
    resetDb();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    const testOutput = path.resolve('./storage/test-p3-output');
    if (fs.existsSync(testOutput)) fs.rmSync(testOutput, { recursive: true, force: true });
  });

  it('GET /api/tasks returns empty array initially', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/tasks' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST /api/tasks creates a task', async () => {
    const creations = listCreations();
    const res = await app.inject({
      method: 'POST', url: '/api/tasks',
      payload: {
        creationIds: [creations[0].id],
        imagesPerCreation: 2,
        width: 512,
        height: 512,
        autoStart: false,
      },
    });
    expect(res.statusCode).toBe(201);
    const data = JSON.parse(res.payload);
    expect(data.task).toBeTruthy();
    expect(data.task.id).toBeTruthy();
    expect(data.images.length).toBe(2);
  });

  it('POST /api/tasks rejects empty creationIds', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/tasks',
      payload: { creationIds: [], imagesPerCreation: 1, width: 512, height: 512 },
    });
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/tasks/:id returns task', async () => {
    const creations = listCreations();
    const createRes = await app.inject({
      method: 'POST', url: '/api/tasks',
      payload: {
        creationIds: [creations[0].id],
        imagesPerCreation: 1,
        width: 512,
        height: 512,
        autoStart: false,
      },
    });
    const { task } = JSON.parse(createRes.payload);

    const res = await app.inject({ method: 'GET', url: `/api/tasks/${task.id}` });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.id).toBe(task.id);
  });

  it('GET /api/tasks/:id/images returns images', async () => {
    const creations = listCreations();
    const createRes = await app.inject({
      method: 'POST', url: '/api/tasks',
      payload: {
        creationIds: [creations[0].id],
        imagesPerCreation: 3,
        width: 512,
        height: 512,
        autoStart: false,
      },
    });
    const { task } = JSON.parse(createRes.payload);

    const res = await app.inject({ method: 'GET', url: `/api/tasks/${task.id}/images` });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data.length).toBe(3);
  });

  it('POST /api/tasks/:id/cancel cancels task', async () => {
    const creations = listCreations();
    const createRes = await app.inject({
      method: 'POST', url: '/api/tasks',
      payload: {
        creationIds: [creations[0].id],
        imagesPerCreation: 1,
        width: 512,
        height: 512,
        autoStart: false,
      },
    });
    const { task } = JSON.parse(createRes.payload);

    const res = await app.inject({ method: 'POST', url: `/api/tasks/${task.id}/cancel` });
    expect(res.statusCode).toBe(200);
  });
});
