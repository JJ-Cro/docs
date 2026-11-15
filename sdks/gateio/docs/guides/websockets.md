---
title: "Gate.io WebSocket subscriptions"
description: "Subscribe to public ticker updates and handle Gate.io WebSocket connection recovery."
---

# WebSocket subscriptions

`WebsocketClient` opens connections as needed, maintains heartbeats and restores subscriptions after reconnects.

## Subscribe to ticker updates

Install `gateio-api` and save this as `stream.ts`. It subscribes to public BTC_USDT Spot ticker updates without credentials.

<<< @/../examples/stream.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node stream.ts
```

Leave it running for new prices, then press Ctrl+C to close the connection.

## Subscription acknowledgements and data

`subscribe(requests, wsKey)` returns `void`. Observe `response` for subscription acknowledgements and `exception` for failures. Inspect `error` in each response as well: subscription rejections can arrive on `response` rather than `exception`. Opening a socket or returning from `subscribe()` does not prove the exchange accepted the channel.

The `update` event carries channel messages. Check `channel` before reading `result`, whose shape depends on the channel. Pass an array to subscribe to multiple topics on the same connection. Use `unsubscribe()` with the same topic, payload and connection key when those updates are no longer needed.

Spot uses `spotV4`. For USDT-settled perpetual futures, use `perpFuturesUSDTV4` with the corresponding `futures.*` channel and payload. Do not send Spot channel names to a futures connection.

## Connection recovery

The SDK restores subscriptions automatically; you do not need to subscribe again after reconnecting. Mark cached data stale on `reconnect` or unexpected closure. The `reconnected` event signals an open socket, not fresh data or recovered history.

Wait for new prices before using a cached ticker. Rebuild incremental order books after gaps and [reconcile private account state](/guides/private-streams#recover-after-a-gap) through REST.

Call `closeAll()` at shutdown. Closing a connection does not cancel an order.

[Private account updates](/guides/private-streams) · [WebsocketClient reference](/api/classes/WebsocketClient)
