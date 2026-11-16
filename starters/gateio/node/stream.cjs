const { WebsocketClient } = require('gateio-api');
const process = require('node:process');

const ws = new WebsocketClient();

ws.on('update', (message) => {
  if (message.channel !== 'spot.tickers') {
    console.log('WebSocket update:', message);
    return;
  }

  const price = message.result?.last;

  if (price) {
    console.log('BTC_USDT WebSocket price:', String(price));
  }
});

ws.on('response', (message) => {
  console.log('WebSocket response:', message);
});
ws.on('exception', (error) => {
  console.error('WebSocket exception:', error);
});
ws.on('reconnect', (event) => {
  console.log('WebSocket reconnecting:', event);
});
ws.on('reconnected', (event) => {
  console.log('WebSocket reconnected:', event);
});

function stop() {
  ws.closeAll();
  console.log('WebSocket closed.');
}

process.once('SIGINT', stop);
process.once('SIGTERM', stop);

ws.subscribe({ topic: 'spot.tickers', payload: ['BTC_USDT'] }, 'spotV4');
