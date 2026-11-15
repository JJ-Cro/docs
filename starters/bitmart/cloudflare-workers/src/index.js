import { RestClient } from 'bitmart-api';

export default {
  async fetch() {
    const client = new RestClient({}, { fetchOptions: { cache: 'no-store' } });
    const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
    const price = response.data.last;
    return Response.json({ symbol: 'BTC_USDT', price });
  },
};
