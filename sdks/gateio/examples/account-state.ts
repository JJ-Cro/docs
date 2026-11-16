import { client } from './authenticated-client.js';

async function main() {
  console.log('Spot balances:', await client.getSpotAccounts());
  console.log(
    'Open BTC_USDT orders:',
    await client.getSpotOrders({
      currency_pair: 'BTC_USDT',
      status: 'open',
      account: 'spot',
      page: 1,
      limit: 100,
    }),
  );
}

main().catch(() => {
  console.error(
    'Account request failed. Check credentials, permissions and environment.',
  );
  process.exitCode = 1;
});
