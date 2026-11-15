export const operations = {
  rest: 'RestClient.getSpotTickerV3()',
  websocket: 'WebsocketClient.subscribe()',
};
export function client(sdk) {
  return new sdk.RestClient({}, { timeout: 15000 });
}
export async function read(client) {
  const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
  return response.data.last;
}
export function stream(sdk) {
  return new sdk.WebsocketClient();
}
export const event = 'update';
export function value(message) {
  return message.table === 'spot/ticker' && message.data?.[0]?.symbol === 'BTC_USDT'
    ? message.data[0].last_price : undefined;
}
export async function subscribe(ws) {
  await Promise.all(ws.subscribe('spot/ticker:BTC_USDT', 'spot'));
}
export const typeExample = `import { RestClient, WebsocketClient } from 'bitmart-api';
new RestClient().getSpotTickerV3({ symbol: 'BTC_USDT' });
new WebsocketClient().closeAll();
`;
