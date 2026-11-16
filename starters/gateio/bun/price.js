import { RestClient } from 'gateio-api';

const client = new RestClient();
const tickers = await client.getSpotTicker({ currency_pair: 'BTC_USDT' });
const price = tickers[0]?.last;

if (!price) {
  throw new Error('No BTC_USDT price was returned.');
}

console.log('BTC_USDT REST price:', price);
