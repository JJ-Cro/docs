import { futures, spot } from './authenticated-client.js';

async function main() {
  const market = process.argv[2];
  if (market === 'spot') {
    const balances = await spot.getSpotWalletBalanceV1();
    const orders = await spot.getSpotOpenOrdersV4({ orderMode: 'spot' });
    console.log('Spot balances:', balances.data.wallet);
    console.log('Spot open orders (one response):', orders.data);
  } else if (market === 'futures') {
    const balances = await futures.getFuturesAccountAssets();
    const positions = await futures.getFuturesAccountPositions({ symbol: 'BTCUSDT' });
    console.log('Futures balances:', balances.data);
    console.log('Futures positions:', positions.data);
  } else {
    throw new Error('Choose spot or futures.');
  }
}

main().catch(() => {
  console.error('Account read failed. Check permissions and sanitized API diagnostics on your server.');
  process.exitCode = 1;
});
