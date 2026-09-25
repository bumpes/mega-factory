import { FastifyPluginAsync } from 'fastify';
import {
  listCreations, getCreation, createCreation, updateCreation, deleteCreation,
  listCategories, aiGenerateCreations,
} from '../services/creations';
import { getSetting } from '../config/settings';

export const creationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/creations', async (request, reply) => {
    const { keyword, category } = request.query as { keyword?: string; category?: string };
    return listCreations({ keyword, category });
  });

  fastify.get('/api/creations/categories', async () => {
    return listCategories();
  });

  fastify.get<{ Params: { id: string } }>('/api/creations/:id', async (request, reply) => {
    const c = getCreation(request.params.id);
    if (!c) return reply.code(404).send({ error: 'Not found' });
    return c;
  });

  fastify.post('/api/creations', async (request, reply) => {
    const body = request.body as Record<string, string>;
    if (!body?.name) return reply.code(400).send({ error: 'name is required' });
    return reply.code(201).send(createCreation({
      name: body.name,
      category: body.category || '',
      source: body.source || 'user',
      setting_desc: body.setting_desc || '',
      copywriting_md: body.copywriting_md || '',
      prompt: body.prompt || '',
      style_tag: body.style_tag || '',
    }));
  });

  fastify.put<{ Params: { id: string } }>('/api/creations/:id', async (request, reply) => {
    const body = request.body as Record<string, string>;
    const updated = updateCreation(request.params.id, body);
    if (!updated) return reply.code(404).send({ error: 'Not found' });
    return updated;
  });

  fastify.delete<{ Params: { id: string } }>('/api/creations/:id', async (request, reply) => {
    deleteCreation(request.params.id);
    return { ok: true };
  });

  fastify.post('/api/creations/ai-generate', async (request, reply) => {
    const { count, styleTemplate } = request.body as { count?: number; styleTemplate?: string };
    const n = Math.min(Math.max(count || 5, 1), 20);
    const style = styleTemplate || getSetting('style_template') || 'megastructure, overwhelming epic scale, hard sci-fi';
    try {
      const creations = await aiGenerateCreations(n, style);
      return { creations, count: creations.length };
    } catch (err) {
      return reply.code(500).send({ error: String(err) });
    }
  });
};
