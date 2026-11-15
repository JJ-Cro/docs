---
title: "Gate.io private account updates over WebSockets"
description: "Subscribe to Spot balances, orders and fills, and recover account state after disconnects."
---

# Private account updates

Use private subscriptions for ongoing balances, orders and fills. Use REST for initial state, explicit lookups and recovery after gaps.

## Subscribe to Spot updates

Save this as `private-stream.ts` beside the [credential helper](/guides/authentication). Follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `private-stream.ts` as the entry file:

<<< @/../examples/private-stream.ts

```sh
node --env-file=.env dist/private-stream.js
```

Press Ctrl+C to close the connection. The example prints private data for local inspection; do not send this output to public logs. It does not maintain a local account store.

The SDK signs each private subscription request with your API key and secret. Ordinary private subscriptions do not require a separate WebSocket API login. Check each subscription response for an error and a successful `result.status` instead of waiting for an `authenticated` event to confirm the channels.

The example follows BTC_USDT orders and fills plus Spot balances. Futures channels use different payloads, often including your user ID. Check the [futures WebSocket reference](https://www.gate.com/docs/developers/futures/ws/en/) rather than reusing the Spot payload.

## Initialize without losing changes

Confirm the required subscriptions and buffer incoming events while loading balances and open orders through REST. Use `getSpotAccounts()` and `getSpotOrders({ currency_pair, status: 'open', account: 'spot' })`, with pagination for each relevant pair.

Merge buffered updates using order IDs, trade IDs and update times. Deduplicate fills and preserve terminal order states so an older snapshot cannot overwrite newer events. Separate REST reads are not an atomic account snapshot.

## Recover after a gap

The SDK reconnects and restores subscriptions automatically. On `reconnect`, mark affected state stale and pause decisions that depend on it. Use `reconnected` to start recovery while buffering new events:

1. Refresh balances and all relevant open orders.
2. Query finished orders and `getSpotTradingHistory()` across the outage, with overlap and pagination. An order missing from open orders may have filled or been cancelled.
3. Resolve uncertain commands by their saved identifiers. Merge and deduplicate history and buffered events.
4. Resume stream-driven decisions only when account state is current.

Keep recovery reads within exchange rate limits. If you temporarily fall back to REST polling, label the data as delayed and reconcile before switching back to streams.

[Order management](/guides/orders) · [Production usage](/guides/production)
