import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initDb, resetDb } from '../db/sqlite';
import { getSetting, putSetting, getAllSettings, putAllSettings } from '../config/settings';
import { settingsRoutes } from '../routes/settings';

const TEST_DB = path.resolve('./storage/test_p1_settings.db');

describe('P1 - Settings', () => {
  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    resetDb();
    await initDb();
  });

  afterAll(() => {
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    delete process.env.DB_PATH;
  });

  it('returns default settings when none set', () => {
    const settings = getAllSettings();
    expect(settings.comfyui_url).toBe('http://127.0.0.1:8188');
    expect(settings.default_count).toBe(3);
    expect(settings.default_resolution).toBe('1024x1024');
    expect(settings.llm_provider).toBe('qwen');
  });

  it('putSetting persists and getSetting retrieves', () => {
    putSetting('comfyui_url', 'http://custom:9999');
    expect(getSetting('comfyui_url')).toBe('http://custom:9999');
  });

  it('putAllSettings updates multiple settings', () => {
    putAllSettings({
      default_count: 5,
      default_resolution: '2048x2048',
      llm_provider: 'qwen',
    });
    const settings = getAllSettings();
    expect(settings.default_count).toBe(5);
    expect(settings.default_resolution).toBe('2048x2048');
    expect(settings.llm_provider).toBe('qwen');
  });

  it('settings persist across save/load cycle', () => {
    putSetting('llm_api_key', 'test-key-123');
    const settings = getAllSettings();
    expect(settings.llm_api_key).toBe('test-key-123');
  });
});

describe('P1 - Settings Routes', () => {
  let fastify: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    process.env.DB_PATH = TEST_DB;
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    resetDb();
    await initDb();
    fastify = Fastify();
    await fastify.register(cors, { origin: true });
    await fastify.register(settingsRoutes);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    delete process.env.DB_PATH;
  });

  it('GET /api/settings returns all settings', async () => {
    const res = await fastify.inject({ method: 'GET', url: '/api/settings' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.comfyui_url).toBeDefined();
    expect(body.default_count).toBeDefined();
  });

  it('PUT /api/settings updates settings', async () => {
    const res = await fastify.inject({
      method: 'PUT',
      url: '/api/settings',
      payload: { default_count: 7, llm_provider: 'qwen' },
    });
    expect(res.statusCode).toBe(200);
    expect(getSetting('default_count')).toBe(7);
    expect(getSetting('llm_provider')).toBe('qwen');
  });

  it('GET /api/settings/test-comfy returns connection status', async () => {
    const res = await fastify.inject({ method: 'GET', url: '/api/settings/test-comfy' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(typeof body.ok).toBe('boolean');
  });

  it('GET /api/settings/test-llm returns connection status', async () => {
    const res = await fastify.inject({ method: 'GET', url: '/api/settings/test-llm' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(typeof body.ok).toBe('boolean');
  });
});
