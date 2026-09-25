import type { FastifyInstance } from 'fastify';
import { getAllSettings, putAllSettings, type Settings } from '../config/settings';
import { testComfyConnection } from '../services/comfyui';
import { createLLMProvider } from '../services/llm/index';

export async function settingsRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/settings', async () => {
    return getAllSettings();
  });

  fastify.put<{ Body: Partial<Settings> }>('/api/settings', async (request) => {
    putAllSettings(request.body);
    return { ok: true };
  });

  fastify.get('/api/settings/test-comfy', async () => {
    return testComfyConnection();
  });

  fastify.get('/api/settings/test-llm', async () => {
    const provider = createLLMProvider();
    return provider.testConnection();
  });
}
