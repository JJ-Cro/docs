---
title: "BitMart SDK production usage"
description: "Plan request limits, connection recovery, account reconciliation and safe shutdown."
---

# Production usage

Reuse clients, keep credentials on the server and grant the minimum permissions. Keep production Spot, production futures and simulated futures explicitly separated in configuration.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

BitMart limits vary by endpoint and operation. Budget account-recovery reads alongside routine traffic, and paginate according to each method's request fields. A WebSocket connection does not remove the limits that apply to subscriptions or REST trading.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## Recover after disconnects

Mark state stale on `reconnect` or an unexpected `close`. The SDK reconnects, authenticates and restores subscriptions, but a `reconnected` event reports an open connection rather than a recovered account. Refresh balances, orders, trades and futures positions through the matching REST client while buffering incoming events.

Spot and futures payloads differ. Key state by account and market as well as symbol, and account for futures position mode. Do not treat Spot quantities as futures contract sizes.

## Shut down cleanly

Stop accepting new work, record unresolved command outcomes and persist order identifiers and checkpoints. Call `closeAll()` on WebSocket clients, then remove your own listeners and timers. Closing a socket does not cancel live orders.

## Logging

Record operation names, sanitized response codes, duration, reconnects and data freshness. Select fields deliberately; full request/error objects and `BITMARTTRACE` output can expose credentials or account information.

<!--@include: @/.vitepress/shared/production/upgrading.md-->

Recheck environment selection, symbol formats, endpoint versions, compressed-message decoding and order recovery after an SDK or runtime upgrade. Test permissions and private operations separately from public connectivity.
