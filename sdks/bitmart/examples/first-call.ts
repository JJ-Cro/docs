import { RestClient } from 'bitmart-api';

async function main() {
  const client = new RestClient();
  const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
  console.log('BTC_USDT last price:', response.data.last);
}

main().catch(() => {
  console.error('Public price request failed. Check connectivity and the API response.');
  process.exitCode = 1;
});
