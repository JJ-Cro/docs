---
title: "Choose a BitMart Spot or futures client"
description: "Choose RestClient, FuturesClientV2 and WebsocketClient for the BitMart product you need."
---

# Choose a client

Choose the REST client for your product. `WebsocketClient` manages both Spot and futures subscriptions.

<!-- #region client-list -->
- [RestClient](/api/classes/RestClient): Spot market data, account reads, Spot and margin trading, earn and other account endpoints, plus legacy futures methods.
- [FuturesClientV2](/api/classes/FuturesClientV2): V2 futures market data, account state, trading and simulated futures.
- [WebsocketClient](/api/classes/WebsocketClient): public and private Spot or futures subscriptions, with automatic connection, authentication and reconnection handling.
<!-- #endregion client-list -->

## Match the product and method version

Use `RestClient` for Spot and `FuturesClientV2` for current V2 futures. The latter uses a different REST host. Creating it does not change your account permissions or position mode.

Method suffixes describe endpoint versions, not separate clients. A Spot workflow can use `getSpotTickerV3()`, `submitSpotOrderV2()` and `getSpotOrderByClientOrderIdV4()` together. Do not replace those suffixes to make them match.

Spot symbols such as `BTC_USDT` and futures symbols such as `BTCUSDT` differ. Futures contract quantities and numeric side codes are not interchangeable with Spot base-asset quantities and `buy`/`sell`.

## Combine REST and WebSocket updates

Use REST for initial state and recovery, and subscriptions for ongoing updates. `subscribe(topic, 'futures')` selects a V2 futures connection. Spot updates use a `table` field; futures updates use `group`. The SDK emits both through `update` and adds `wsKey` to identify the connection.

REST methods return the API envelope rather than only its `data`. See [Error handling](/guides/errors) for rejection behavior and [Private account updates](/guides/private-streams) for recovery.

## Order requests

Use the REST clients for the [order workflow](/guides/orders) documented here. This release does not export a `WebsocketAPIClient`. Subscription methods are not order-placement methods.

## Environments

Production is the default. `demoTrading: true` selects simulated trading only for `FuturesClientV2` and V2 futures WebSocket connections. It leaves Spot on production. See [Futures demo trading](/guides/testing-environments#demo-trading).
