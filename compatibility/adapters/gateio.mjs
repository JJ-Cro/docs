export const operations = {
  rest: 'RestClient.getSpotTicker()',
  websocket: 'WebsocketClient.subscribe()',
};
export function client(sdk) {
  return new sdk.RestClient({}, { timeout: 15000 });
}
export async function read(client) {
  const tickers = await client.getSpotTicker({ currency_pair: 'BTC_USDT' });
  return tickers[0]?.last;
}
export function stream(sdk) {
  return new sdk.WebsocketClient();
}
export const event = 'update';
export function value(message) {
  return message.channel === 'spot.tickers' ? message.result?.last : undefined;
}
export async function subscribe(ws) {
  ws.subscribe({ topic: 'spot.tickers', payload: ['BTC_USDT'] }, 'spotV4');
}
export const typeExample = `import { RestClient, WebsocketClient } from 'gateio-api';
new RestClient().getSpotTicker({ currency_pair: 'BTC_USDT' });
new WebsocketClient().subscribe({ topic: 'spot.tickers', payload: ['BTC_USDT'] }, 'spotV4');
new WebsocketClient().closeAll();
`;
