import { FastifyPluginAsync } from 'fastify';
import { getLanAddresses, generateQRCodeSVG } from '../services/network';

export const networkRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/network/lan-addresses', async () => {
    return { addresses: getLanAddresses() };
  });

  fastify.get('/api/network/qrcode', async (request, reply) => {
    const { url } = request.query as { url?: string };
    if (!url) {
      return reply.status(400).send({ error: 'url parameter required' });
    }
    const svg = await generateQRCodeSVG(url);
    return reply.type('image/svg+xml').send(svg);
  });
};
