import { FastifyPluginAsync } from 'fastify';
import {
  listHistory, getComparison, saveComparison,
  pickRefRandom, pickRefById, prefillBFromFeatureCard, computeDiff,
} from '../services/compare';

export const compareRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/compare/history', async (request) => {
    const { creationId } = request.query as { creationId?: string };
    return listHistory(creationId || undefined);
  });

  fastify.get<{ Params: { id: string } }>('/api/compare/:id', async (request, reply) => {
    const cmp = getComparison(request.params.id);
    if (!cmp) return reply.code(404).send({ error: 'Not found' });
    return cmp;
  });

  fastify.post('/api/compare', async (request, reply) => {
    const body = request.body as Record<string, unknown>;
    const cmp = saveComparison({
      creationId: String(body.creationId),
      genImagePath: String(body.genImagePath),
      refId: String(body.refId),
      scoreA: body.scoreA as any,
      scoreB: body.scoreB as any,
      note: String(body.note || ''),
    });
    return reply.code(201).send(cmp);
  });

  fastify.get('/api/compare/pick-ref/random', async () => {
    const ref = pickRefRandom();
    if (!ref) return { ref: null };
    return { ref };
  });

  fastify.get<{ Params: { id: string } }>('/api/compare/pick-ref/:id', async (request, reply) => {
    const ref = pickRefById(request.params.id);
    if (!ref) return reply.code(404).send({ error: 'Not found' });
    return ref;
  });

  fastify.get<{ Params: { refId: string } }>('/api/compare/prefill/:refId', async (request, reply) => {
    const card = prefillBFromFeatureCard(request.params.refId);
    if (!card) return reply.code(404).send({ error: 'Reference not found' });
    return card;
  });

  fastify.post('/api/compare/compute-diff', async (request) => {
    const { scoreA, scoreB } = request.body as { scoreA: Record<string, number>; scoreB: Record<string, number> };
    return computeDiff(scoreA as any, scoreB as any);
  });
};
