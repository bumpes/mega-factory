import { FastifyPluginAsync } from 'fastify';
import { listReferences, getReference, saveUpload, deleteReference, upsertFeatureCard, getReferenceDir } from '../services/references';
import fs from 'fs';
import path from 'path';

export const referencesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/references', async () => {
    return listReferences();
  });

  fastify.get<{ Params: { id: string } }>('/api/references/:id', async (request, reply) => {
    const ref = getReference(request.params.id);
    if (!ref) return reply.code(404).send({ error: 'Not found' });
    return ref;
  });

  fastify.post('/api/references/upload', async (request, reply) => {
    const file = await request.file();
    if (!file) return reply.code(400).send({ error: 'No file uploaded' });

    const chunks: Buffer[] = [];
    for await (const chunk of file.file) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const ref = saveUpload(file.filename, buffer);
    return reply.code(201).send(ref);
  });

  fastify.delete<{ Params: { id: string } }>('/api/references/:id', async (request, reply) => {
    const ok = deleteReference(request.params.id);
    if (!ok) return reply.code(404).send({ error: 'Not found' });
    return { ok: true };
  });

  fastify.put<{ Params: { id: string } }>('/api/references/:id/feature-card', async (request, reply) => {
    const body = request.body as Record<string, unknown>;
    const card = {
      feat_scale: Number(body.feat_scale) || 0,
      feat_composition: Number(body.feat_composition) || 0,
      feat_light: Number(body.feat_light) || 0,
      feat_detail: Number(body.feat_detail) || 0,
      feat_material: Number(body.feat_material) || 0,
      feat_mood: Number(body.feat_mood) || 0,
      feat_color: Number(body.feat_color) || 0,
      highlight_note: String(body.highlight_note || ''),
    };
    const ref = upsertFeatureCard(request.params.id, card);
    if (!ref) return reply.code(404).send({ error: 'Not found' });
    return ref;
  });

  fastify.get('/api/references/image', async (request, reply) => {
    const { path: imgPath } = request.query as { path?: string };
    if (!imgPath) return reply.code(400).send({ error: 'path required' });
    const resolved = path.resolve(imgPath);
    const refDir = path.resolve(getReferenceDir());
    if (!resolved.startsWith(refDir)) return reply.code(403).send({ error: 'forbidden' });
    if (!fs.existsSync(resolved)) return reply.code(404).send({ error: 'Not found' });
    const ext = path.extname(resolved).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
    };
    reply.header('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    const stream = fs.createReadStream(resolved);
    return reply.send(stream);
  });
};
