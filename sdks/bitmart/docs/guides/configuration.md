---
title: "BitMart SDK configuration and futures demo trading"
description: "Configure REST timeouts, WebSocket connections and V2 futures demo endpoints."
---

# Configuration and environments

`RestClient` and `FuturesClientV2` accept SDK options first and Axios request options second. `WebsocketClient` accepts SDK options and an optional logger. Credentials use `apiKey`, `apiSecret` and `apiMemo`.

<<< @/../examples/configure-rest.ts

This public configuration uses production. `keepAlive` belongs in the first REST argument; Axios `timeout` belongs in the second, in milliseconds. The SDK's default REST timeout is five minutes, so choose a shorter application timeout where appropriate without assuming a timeout cancels an exchange operation.

## Production endpoints {#environments}

`RestClient` uses `https://api-cloud.bitmart.com`; `FuturesClientV2` uses `https://api-cloud-v2.bitmart.com`. The WebSocket client selects the Spot or V2 futures endpoint from the market argument.

Set `baseUrl` or `wsUrl` only for a deliberate endpoint override. These values take precedence over demo selection and do not change permissions or regional access. A single `wsUrl` override applies to the client's connections, so do not use it to combine incompatible markets on one endpoint.

## Futures demo trading {#demo-trading}

See [Futures demo trading](/guides/testing-environments#demo-trading) for the complete setup. Set `demoTrading: true` on both `FuturesClientV2` and `WebsocketClient`. Use only futures subscriptions with the demo client. **Spot remains on production**, even if this flag is true.

## Connection and signing options

WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Keep heartbeat handling enabled and avoid settings so short that ordinary latency causes repeated reconnects.

Node.js `keepAlive` uses an HTTPS agent. Leave it disabled when providing a proxy agent or using the browser/Worker recipes. `parseExceptions` controls REST error post-processing, not whether unsuccessful requests reject.

The request builder removes undefined top-level parameters before signing. `strictParamValidation` is not a complete request validator. The signing helper adds `recvWindow` to signed requests, using the configured value (5000 ms by default) unless the request supplies its own `recvWindow`. Check the endpoint’s accepted parameter names and limits. Keep the clock synchronized instead of widening validity windows to hide clock errors.

[Proxies](/guides/proxies) · [Error handling](/guides/errors) · [RestClientOptions reference](/api/interfaces/RestClientOptions)
