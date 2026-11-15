---
title: "BitMart private account WebSocket updates"
description: "Subscribe to Spot order and balance updates and recover account state after disconnects."
---

# Private account updates

Private subscriptions require the same API key, secret and memo as REST. Keep the clients on your server and use credentials for the account and product you intend to monitor.

## Subscribe to Spot orders and balances

Keep this example beside [authenticated-client.ts](/guides/authentication#configure-server-side-clients):

<<< @/../examples/private-stream.ts

`spot/user/order:BTC_USDT` receives order updates for that symbol. `spot/user/balance:BALANCE_UPDATE` receives Spot balance updates. Authentication happens automatically on the private connection. The example records receipt only; implement your own handler to validate and apply the channel's fields.

An `authenticated` event confirms login, not that a complete account snapshot has arrived. Do not treat an empty stream as evidence that the account has no orders or balances.

## Recover after reconnecting

<!--@include: @/.vitepress/shared/production/account-state.md-->

Use `getSpotWalletBalanceV1()`, `getSpotOpenOrdersV4()`, order history and trade reads to reconcile missed updates. Buffer events while refreshing state and deduplicate them using the channel's identifiers. Keep the recovery work bounded and respect endpoint rate limits.

`reconnected` signals that the socket reopened. It does not establish that authentication, subscriptions or account reconciliation are complete. Resume trading decisions only after the state your application relies on is current.

## V2 futures account streams

Use `futures/asset:USDT`, `futures/position` and `futures/order` with `subscribe(topics, 'futures', true)`. Futures updates use `group` rather than Spot's `table`; use the futures payload definitions rather than the Spot handler. Keep REST and WebSocket [demo settings](/guides/testing-environments#demo-trading) aligned.

[Production usage](/guides/production) · [BitMart futures streams](https://developer-pro.bitmart.com/en/futuresv2/)
