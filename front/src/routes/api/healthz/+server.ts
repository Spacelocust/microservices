import { json } from '@sveltejs/kit';

export const GET = () => {
  return json({
    uptime: process.uptime(),
    status: 'healthy',
    date: Date.now(),
  });
};
