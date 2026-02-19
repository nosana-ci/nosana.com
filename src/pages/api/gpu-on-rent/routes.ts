import type { APIRoute } from 'astro';
import { getGPUMarkets } from '../../../utils/gpuMarkets';

export const GET: APIRoute = async () => {
  try {
    const categorized = await getGPUMarkets();

    return new Response(JSON.stringify(categorized), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Error fetching GPU markets:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
