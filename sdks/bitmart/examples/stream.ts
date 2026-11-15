import { WebsocketClient } from 'bitmart-api';

const ws = new WebsocketClient();
ws.on('update', (message) => {
  if (message.table !== 'spot/ticker') return;
  for (const ticker of message.data ?? []) {
    if (ticker.symbol === 'BTC_USDT') console.log('BTC_USDT last price:', ticker.last_price);
  }
});
ws.on('response', (message) => console.log('Subscription response:', message));
ws.on('exception', () => console.error('WebSocket error. Inspect sanitized connection diagnostics.'));
ws.on('reconnect', ({ wsKey }) => console.log('Reconnecting:', wsKey));
ws.on('reconnected', ({ wsKey }) => console.log('Reconnected; waiting for fresh data:', wsKey));

Promise.all(ws.subscribe('spot/ticker:BTC_USDT', 'spot')).catch(() => {
  console.error('Subscription request failed.');
  ws.closeAll();
  process.exitCode = 1;
});
process.once('SIGINT', () => ws.closeAll());
process.once('SIGTERM', () => ws.closeAll());
