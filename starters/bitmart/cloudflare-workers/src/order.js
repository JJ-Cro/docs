import { RestClient } from 'bitmart-api';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/order') {
      return new Response('Not found', { status: 404 });
    }
    if (request.method !== 'POST') {
      return new Response('Use POST', { status: 405 });
    }
    if (
      !env.ORDER_TOKEN ||
      request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN
    ) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { price, quantity } = await request.json();

    const positiveDecimal = (value) =>
      typeof value === 'string' &&
      /^\d+(\.\d+)?$/.test(value) &&
      Number(value) > 0 &&
      Number.isFinite(Number(value));
    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {
      return new Response(
        'Use positive decimal strings for price and quantity',
        { status: 400 },
      );
    }
    if (
      !env.BITMART_API_KEY ||
      !env.BITMART_API_SECRET ||
      !env.BITMART_API_MEMO
    ) {
      return new Response('Missing exchange credentials', { status: 503 });
    }

    const client = new RestClient(
      {
        apiKey: env.BITMART_API_KEY,
        apiSecret: env.BITMART_API_SECRET,
        apiMemo: env.BITMART_API_MEMO,
      },
      { fetchOptions: { cache: 'no-store' } },
    );

    const result = await client.submitSpotOrderV2({
      symbol: 'BTC_USDT',
      side: 'buy',
      type: 'limit_maker',
      price,
      size: quantity,
    });

    return Response.json(result);
  },
};
