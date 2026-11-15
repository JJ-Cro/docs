import { WebsocketClient } from 'bitmart-api';
import { credentials } from './authenticated-client.js';

const ws = new WebsocketClient(credentials);
ws.on('authenticated', ({ wsKey }) => console.log('Authenticated:', wsKey));
ws.on('update', (message) => {
  // Forward selected fields to your account-state handler; do not publish private payloads.
  if (message.table === 'spot/user/order') console.log('Spot order update received.');
  if (message.table === 'spot/user/balance') console.log('Spot balance update received.');
});
ws.on('exception', () => console.error('Private stream error. Check credentials and permissions.'));
ws.on('reconnect', ({ wsKey }) => console.log('Mark account state stale:', wsKey));
ws.on('reconnected', ({ wsKey }) => console.log('Reconcile account state through REST:', wsKey));

Promise.all(ws.subscribe([
  'spot/user/order:BTC_USDT',
  'spot/user/balance:BALANCE_UPDATE',
], 'spot', true)).catch(() => {
  console.error('Private subscription failed.');
  ws.closeAll();
  process.exitCode = 1;
});
process.once('SIGINT', () => ws.closeAll());
process.once('SIGTERM', () => ws.closeAll());
