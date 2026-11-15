import { FuturesClientV2, RestClient } from 'bitmart-api';

async function main() {
  const spot = new RestClient();
  const book = await spot.getSpotOrderBookDepthV3({ symbol: 'BTC_USDT', limit: 20 });
  const pairs = await spot.getSpotTradingPairDetailsV1();
  console.log('Spot order book:', book.data);
  console.log('Spot pair rules:', pairs.data.symbols.find((pair) => pair.symbol === 'BTC_USDT'));

  const futures = new FuturesClientV2();
  const contracts = await futures.getFuturesContractDetails({ symbol: 'BTCUSDT' });
  console.log('Futures contract details:', contracts.data.symbols);
}

main().catch(() => {
  console.error('Market-data request failed. Inspect sanitized API diagnostics on your server.');
  process.exitCode = 1;
});
