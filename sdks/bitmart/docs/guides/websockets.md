---
title: "BitMart public WebSocket streams"
description: "Subscribe to BitMart Spot tickers and manage subscription, reconnection and shutdown events."
---

# Public streams

Use `WebsocketClient` for ongoing prices. This Node.js example listens to Spot tickers until Ctrl+C.

## Subscribe to a ticker

<<< @/../examples/stream.ts{js}

`subscribe()` returns an array of promises, so use `Promise.all()` to observe failures from connection or request setup. These promises do not wait for exchange subscription acknowledgements. Resolution does not prove that a channel is active or a fresh ticker has arrived. Inspect `response` and `exception` events, then wait for an `update` for your topic.

Spot ticker messages use `table: 'spot/ticker'`, with records in `data` and the price in `last_price`. This differs from REST V3's `data.last`.

## Select the market

Pass `spot` for topics such as `spot/ticker:BTC_USDT`. For V2 futures, use `futures/ticker:BTCUSDT` with `futures`; futures messages use `group` rather than `table`. Check each channel's payload before reading price fields.

`subscribeTopics([...])` can infer the market from topic prefixes. The explicit `subscribe(topics, market)` form shown here returns promises that can be awaited. Avoid `connectAll()` when you only need public prices, because it also opens private connections.

## Reconnect and stop

The SDK manages heartbeats, reconnects and resubscriptions. Mark cached prices stale on a disconnect and wait for a fresh update after reconnection. Call `unsubscribe(topics, market)` to remove individual subscriptions, or `closeAll()` to stop the client. Remove application-owned listeners and timers when a view or service is disposed.

## Compressed messages and runtimes

BitMart can send compressed frames. This release's decoder recognizes Node.js `Buffer` data and uses `DecompressionStream('deflate-raw')`, `Response` and Web Streams. Browser and mobile WebSocket implementations can deliver different binary types. A successful bundle alone does not prove that streaming works; follow the [runtime setup and limitations](/compatibility).

[Private account updates](/guides/private-streams) · [Production usage](/guides/production) · [BitMart WebSocket documentation](https://developer-pro.bitmart.com/en/spot/#websocket-basic)
