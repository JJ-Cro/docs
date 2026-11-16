---
title: "Choose a Gate.io SDK client"
description: "Choose RestClient, WebsocketClient or WebsocketAPIClient for Gate.io requests and subscriptions."
---

# Choose a client

Use `RestClient` for individual requests and `WebsocketClient` for ongoing market and account updates.

<!-- #region client-list -->
- [RestClient](/api/classes/RestClient): public market data, authenticated account reads and order commands over REST.
- [WebsocketClient](/api/classes/WebsocketClient): public and private subscriptions, connection events and low-level WebSocket API requests.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): promise-based Spot and perpetual-futures order requests over WebSockets.
<!-- #endregion client-list -->

## Combine requests and subscriptions {#rest-and-subscriptions-work-together}

One REST client covers multiple products. Method names identify the API family, such as `getSpotTicker()` for Spot and `getFuturesTickers()` for perpetual futures. Futures methods also take a settlement currency. Choose the account and product deliberately; Spot amounts and futures contract sizes use different units.

For streams, pass the connection key as the second argument to `subscribe()`. Use `spotV4` for Spot and margin, or `perpFuturesUSDTV4` for USDT-settled perpetual futures. The SDK also exports connection keys for BTC-settled perpetuals, delivery futures and options. Select the key and channel together using the [WebSocket reference](/api/classes/WebsocketClient).

Keep long-lived clients for each account and environment. After a disconnect, recover missed state through REST before relying on cached data.

## Send WebSocket API requests {#awaitable-websocket-commands}

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

`WebsocketAPIClient` provides methods such as `getSpotOrderStatus()`, `submitNewSpotOrder()` and `submitNewFuturesOrder()`. It opens and authenticates the connection when needed. Use private subscriptions separately to follow fills and account changes.

[WebSocket subscriptions](/guides/websockets) · [WebSocket API requests](/guides/websocket-api)
