import { RestClient } from 'gateio-api';

export default {
  async fetch() {
    const client = new RestClient({}, { fetchOptions: { cache: 'no-store' } });
    const tickers = await client.getSpotTicker({ currency_pair: 'BTC_USDT' });
    const price = tickers[0]?.last;
    return Response.json({ symbol: 'BTC_USDT', price });
  },
};
