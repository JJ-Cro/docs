import { requiredEnv, spot } from './authenticated-client.js';

async function main() {
  const command = process.argv[2];
  const symbol = 'BTC_USDT';
  // Generate and persist this ID in your application before sending a new order.
  const clientOrderId = requiredEnv('BITMART_CLIENT_ORDER_ID');

  switch (command) {
    case 'place': {
      if (process.env.BITMART_ALLOW_LIVE_ORDER !== 'yes') {
        throw new Error('Set BITMART_ALLOW_LIVE_ORDER=yes only after reviewing this live Spot order.');
      }
      const result = await spot.submitSpotOrderV2({
        symbol,
        side: 'buy',
        type: 'limit_maker',
        client_order_id: clientOrderId,
        price: requiredEnv('BITMART_LIMIT_PRICE'),
        size: requiredEnv('BITMART_ORDER_SIZE'),
      });
      console.log('Submitted order ID:', result.data.order_id);
      break;
    }
    case 'status': {
      const result = await spot.getSpotOrderByClientOrderIdV4({
        clientOrderId,
        queryState: process.env.BITMART_QUERY_STATE === 'history' ? 'history' : 'open',
      });
      console.log('Order:', result.data);
      break;
    }
    case 'cancel': {
      if (process.env.BITMART_ALLOW_LIVE_CANCEL !== 'yes') {
        throw new Error('Set BITMART_ALLOW_LIVE_CANCEL=yes only after reviewing this live Spot cancellation.');
      }
      const result = await spot.cancelSpotOrderV3({ symbol, client_order_id: clientOrderId });
      console.log('Cancellation response:', result.data.result);
      break;
    }
    default:
      throw new Error('Choose place, status or cancel. These commands use production Spot.');
  }
}

main().catch(() => {
  console.error('Order command failed. Resolve its outcome before retrying; inspect sanitized API diagnostics.');
  process.exitCode = 1;
});
