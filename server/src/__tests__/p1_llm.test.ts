import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initDb, resetDb } from '../db/sqlite';
import { createLLMProvider } from '../services/llm/index';
import { putSetting } from '../config/settings';

const TEST_DB = path.resolve('./storage/test_p1_llm.db');

describe('P1 - LLM Abstraction', () => {
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

  it('createLLMProvider returns qwen by default', () => {
    const provider = createLLMProvider();
    expect(provider.name).toBe('qwen');
  });

  it('createLLMProvider returns yuanbao when configured', () => {
    putSetting('llm_provider', 'yuanbao');
    const provider = createLLMProvider();
    expect(provider.name).toBe('yuanbao');
  });

  it('testConnection returns error when no API key', async () => {
    putSetting('llm_provider', 'yuanbao');
    putSetting('llm_api_key', '');
    const provider = createLLMProvider();
    const result = await provider.testConnection();
    expect(result.ok).toBe(false);
    expect(result.error).toContain('API Key');
  });

  it('testConnection for qwen returns error when no API key', async () => {
    putSetting('llm_provider', 'qwen');
    putSetting('llm_api_key', '');
    const provider = createLLMProvider();
    const result = await provider.testConnection();
    expect(result.ok).toBe(false);
    expect(result.error).toContain('API Key');
  });
});
