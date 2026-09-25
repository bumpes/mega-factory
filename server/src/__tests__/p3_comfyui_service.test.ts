import { describe, it, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { buildWorkflow, loadWorkflowTemplate, testComfyConnection, downloadImage } from '../services/comfyui';
import { initDb, resetDb } from '../db/sqlite';
import fs from 'fs';
import path from 'path';

const TEST_DB = path.resolve('./storage/test-comfyui.db');

beforeAll(async () => {
  process.env.DB_PATH = TEST_DB;
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
  await initDb();
});

afterAll(() => {
  resetDb();
  if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
});

describe('P3 - ComfyUI service', () => {
  describe('loadWorkflowTemplate', () => {
    it('loads the workflow JSON from disk', () => {
      const template = loadWorkflowTemplate();
      expect(template).toBeTruthy();
      expect(typeof template).toBe('object');
    });

    it('contains expected node ids', () => {
      const template = loadWorkflowTemplate();
      const keys = Object.keys(template);
      expect(keys).toContain('3');
      expect(keys).toContain('5');
      expect(keys).toContain('7');
      expect(keys).toContain('9');
      expect(keys).toContain('11');
    });

    it('has a CheckpointLoaderSimple node', () => {
      const template = loadWorkflowTemplate();
      const values = Object.values(template) as Array<{ class_type: string }>;
      const loader = values.find((n) => n.class_type === 'CheckpointLoaderSimple');
      expect(loader).toBeTruthy();
    });

    it('has placeholders for prompt, width, height, seed', () => {
      const template = loadWorkflowTemplate();
      const values = Object.values(template) as Array<{ inputs: Record<string, unknown> }>;
      const texts = values.flatMap((n) => (n.inputs?.text ? [n.inputs.text] : []));
      const widths = values.flatMap((n) => (n.inputs?.width !== undefined ? [n.inputs.width] : []));
      const heights = values.flatMap((n) => (n.inputs?.height !== undefined ? [n.inputs.height] : []));
      const seeds = values.flatMap((n) => (n.inputs?.seed !== undefined ? [n.inputs.seed] : []));

      expect(texts).toContain('POSITIVE_PROMPT_PLACEHOLDER');
      expect(widths).toContain('WIDTH_PLACEHOLDER');
      expect(heights).toContain('HEIGHT_PLACEHOLDER');
      expect(seeds).toContain('SEED_PLACEHOLDER');
    });
  });

  describe('buildWorkflow', () => {
    it('replaces all placeholders and preserves node connections', () => {
      const template = loadWorkflowTemplate();
      const wf = buildWorkflow(template, 'colossal megastructure', 768, 1024, 42);
      const values = Object.values(wf) as Array<{ inputs: Record<string, unknown> }>;

      const textNode = values.find((n) => n.inputs?.text === 'colossal megastructure');
      expect(textNode).toBeTruthy();

      const sizeNode = values.find((n) => n.inputs?.width === 768 && n.inputs?.height === 1024);
      expect(sizeNode).toBeTruthy();

      const seedNode = values.find((n) => n.inputs?.seed === 42);
      expect(seedNode).toBeTruthy();

      const ksampler = values.find((n) => n.inputs?.steps === 30);
      expect(ksampler).toBeTruthy();
      expect(ksampler!.inputs.model).toEqual(['11', 0]);
      expect(ksampler!.inputs.positive).toEqual(['3', 0]);
      expect(ksampler!.inputs.negative).toEqual(['4', 0]);
    });

    it('does not mutate the original template', () => {
      const template = loadWorkflowTemplate();
      const templateStr = JSON.stringify(template);
      buildWorkflow(template, 'test', 512, 512, 1);
      expect(JSON.stringify(template)).toBe(templateStr);
    });

    it('generates unique random seeds', () => {
      const template = loadWorkflowTemplate();
      const seeds = new Set<number>();
      for (let i = 0; i < 10; i++) {
        const wf = buildWorkflow(template, 'test', 1024, 1024);
        const values = Object.values(wf) as Array<{ inputs: Record<string, unknown> }>;
        const seed = values.find((n) => typeof n.inputs?.seed === 'number')?.inputs?.seed as number;
        seeds.add(seed);
      }
      expect(seeds.size).toBeGreaterThan(1);
    });
  });

  describe('testComfyConnection', () => {
    const originalFetch = globalThis.fetch;

    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it('returns ok when ComfyUI responds', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;
      const result = await testComfyConnection();
      expect(result.ok).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('returns error on HTTP failure', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;
      const result = await testComfyConnection();
      expect(result.ok).toBe(false);
      expect(result.error).toContain('500');
    });

    it('returns error on network failure', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('ECONNREFUSED')) as unknown as typeof fetch;
      const result = await testComfyConnection();
      expect(result.ok).toBe(false);
      expect(result.error).toContain('ECONNREFUSED');
    });
  });

  describe('downloadImage', () => {
    const originalFetch = globalThis.fetch;
    const testDir = path.resolve('./storage/test-download');

    beforeEach(() => {
      if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
    });

    afterEach(() => {
      globalThis.fetch = originalFetch;
      if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
    });

    it('downloads and saves image to disk', async () => {
      const fakeBuffer = Buffer.from('fake-image-data');
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(fakeBuffer.buffer.slice(fakeBuffer.byteOffset, fakeBuffer.byteOffset + fakeBuffer.byteLength)),
      }) as unknown as typeof fetch;

      const destPath = path.join(testDir, 'test.png');
      await downloadImage('test.png', '', 'output', destPath);

      expect(fs.existsSync(destPath)).toBe(true);
      expect(fs.readFileSync(destPath).toString()).toBe('fake-image-data');
    });

    it('throws on HTTP error', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 }) as unknown as typeof fetch;
      const destPath = path.join(testDir, 'missing.png');
      await expect(downloadImage('missing.png', '', 'output', destPath)).rejects.toThrow('Failed to download');
    });
  });
});
