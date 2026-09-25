import { FastifyPluginAsync } from 'fastify';
import { getDashboard } from '../services/dashboard';

export const dashboardRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/dashboard', async () => {
    return getDashboard();
  });
};
