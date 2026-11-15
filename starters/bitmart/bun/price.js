import { RestClient } from 'bitmart-api';

const client = new RestClient();
const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
const price = response.data.last;

if (!price) {
  throw new Error('No BTC_USDT price was returned.');
}

console.log('BTC_USDT REST price:', price);
