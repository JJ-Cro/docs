import { client, requiredEnv } from './authenticated-client.js';

async function main() {
  const command = process.argv[2];
  const clientOrderId = requiredEnv('GATEIO_CLIENT_ORDER_ID');
  if (
    !clientOrderId.startsWith('t-') ||
    clientOrderId.length < 3 ||
    clientOrderId.length > 30 ||
    /[^A-Za-z0-9_.-]/.test(clientOrderId.slice(2))
  ) {
    throw new Error(
      'Use t- followed by 1–28 letters, digits, underscores, hyphens or dots.',
    );
  }
  const orderId = process.env.GATEIO_ORDER_ID || clientOrderId;
  const lookup = {
    currency_pair: 'BTC_USDT',
    account: 'spot' as const,
    order_id: orderId,
  };

  switch (command) {
    case 'place':
      console.log('Submitting client order ID:', clientOrderId);
      console.log(
        'Order response:',
        await client.submitSpotOrder({
          currency_pair: 'BTC_USDT',
          account: 'spot',
          type: 'limit',
          side: 'buy',
          text: clientOrderId,
          price: requiredEnv('GATEIO_LIMIT_PRICE'),
          amount: requiredEnv('GATEIO_ORDER_SIZE'),
          time_in_force: 'poc',
        }),
      );
      break;
    case 'status':
      console.log('Order state:', await client.getSpotOrder(lookup));
      break;
    case 'amend':
      console.log(
        'Amendment response:',
        await client.updateSpotOrder({
          ...lookup,
          price: requiredEnv('GATEIO_NEW_PRICE'),
        }),
      );
      break;
    case 'cancel':
      console.log(
        'Cancellation response:',
        await client.cancelSpotOrder(lookup),
      );
      break;
    default:
      throw new Error(
        'Choose place, status, amend or cancel. Live clients use real funds.',
      );
  }
}

main().catch(() => {
  console.error('Order command failed. Resolve its outcome before retrying.');
  process.exitCode = 1;
});
