import { RestClient } from 'gateio-api';

const client = new RestClient({}, { timeout: 10000 });

async function main() {
  console.log(
    'Pair rules:',
    await client.getSpotCurrencyPair({ currency_pair: 'BTC_USDT' }),
  );
  console.log(
    'Order book:',
    await client.getSpotOrderBook({
      currency_pair: 'BTC_USDT',
      limit: 10,
      with_id: true,
    }),
  );
  console.log(
    'Candles:',
    await client.getSpotCandles({
      currency_pair: 'BTC_USDT',
      interval: '1m',
      limit: 5,
    }),
  );
}

main().catch(() => {
  console.error('Unable to read market data.');
  process.exitCode = 1;
});
