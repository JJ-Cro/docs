export default {
  name: 'Gate.io',
  sourceDirectory: 'gateio-api',
  packageName: 'gateio-api',
  entryPoint: 'src/index.ts',
  tsconfig: 'tsconfig.cjs.json',
  compatibilityPage: 'authored',
  clients: ['RestClient', 'WebsocketClient', 'WebsocketAPIClient'],
  website: 'https://siebly.io/sdk/gate/javascript',
  tutorial: 'https://siebly.io/sdk/gate/javascript/tutorial',
  repository: 'https://github.com/sieblyio/gateio-api',
  referenceDescriptions: {
    WebsocketAPIClient:
      'Promise-based Spot and perpetual-futures WebSocket API requests. Connections and authentication are established as needed. Select TestNet with `useTestnet: true` in constructor options, keeping the normal connection key. Results are in `response.data.result`.',
    'WebsocketClient.subscribe':
      'Subscribe to one or more channels on the connection selected by the required second argument, `wsKey`. Pass a topic string or `{ topic, payload }` object. Connection, private-request signing and resubscription are automatic. This method returns void; inspect subscription responses for acceptance or errors.',
    'WebsocketClient.unsubscribe':
      'Remove subscriptions using the same topic, payload and required connection key passed to subscribe. Removed subscriptions are not restored after reconnecting.',
    'WSClientConfigurableOptions.recvWindow':
      'Offset added to the local timestamp when signing WebSocket requests, in milliseconds. Defaults to -1000. This does not configure a server-side acceptance window.',
  },
  referenceHelp: [
    {
      client: 'RestClient',
      method: 'getSpotTicker',
      example: 'first-call.ts',
      guide: '/getting-started',
      title: 'Read a public ticker',
    },
    {
      client: 'RestClient',
      method: 'getSpotOrderBook',
      example: 'market-data.ts',
      guide: '/guides/market-data',
      title: 'Read an order book',
    },
    {
      client: 'RestClient',
      method: 'getSpotAccounts',
      example: 'account-state.ts',
      guide: '/guides/authentication',
      title: 'Read Spot balances',
    },
    ...[
      'submitSpotOrder',
      'getSpotOrder',
      'updateSpotOrder',
      'cancelSpotOrder',
      'getSpotOrders',
      'getSpotTradingHistory',
    ].map((method) => ({
      client: 'RestClient',
      method,
      guide: '/guides/orders',
      title: 'Spot order management',
    })),
    {
      client: 'WebsocketClient',
      method: 'subscribe',
      example: 'stream.ts',
      guide: '/guides/websockets',
      title: 'Subscribe to ticker updates',
    },
    {
      client: 'WebsocketAPIClient',
      method: 'getSpotOrderStatus',
      example: 'ws-api.ts',
      guide: '/guides/websocket-api',
      title: 'Read an order over WebSockets',
    },
  ],
  guides: [
    { text: 'Spot order management', link: '/guides/orders' },
    {
      text: 'Private account updates (WebSocket)',
      link: '/guides/private-streams',
    },
    { text: 'WebSocket API requests', link: '/guides/websocket-api' },
  ],
};
