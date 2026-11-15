---
title: "BitMart Spot order placement, status and cancellation"
description: "Use persisted client order IDs to place, inspect and cancel Spot orders safely."
---

# Spot order management

These operations use **production Spot funds**. The SDK has no Spot demo switch. Start with [public reads](/guides/market-data) and [account reads](/guides/authentication), then review the symbol, permissions, available funds, quantity, price and current trading rules before sending an order.

## Place, inspect or cancel one order

Keep this example beside [authenticated-client.ts](/guides/authentication#configure-server-side-clients). It performs one selected command per run:

<<< @/../examples/first-order.ts

Set `BITMART_CLIENT_ORDER_ID` to a new identifier your application has already persisted before placing a new order. Supply `BITMART_LIMIT_PRICE` and `BITMART_ORDER_SIZE` as decimal strings. `size` is the base-asset quantity for this Spot limit order. Setting `BITMART_ALLOW_LIVE_ORDER=yes` permits the example's `place` command to send it. The `cancel` command separately requires `BITMART_ALLOW_LIVE_CANCEL=yes` and cancels the order identified by the saved client order ID. The `status` command only reads state.

`limit_maker` requests a maker-only order; it can be rejected rather than immediately matched. It is still a live order, not a validation request. The SDK type permits missing size and price because it covers other order types; your application must validate the fields required for the chosen type.

## Read the result

Placement returns `data.order_id`, which identifies an accepted request rather than proving a fill. Save it alongside your client order ID. A cancellation response's `data.result` is also not a final fill ledger. Read order state and trades, and use [private updates](/guides/private-streams) to follow changes.

Parameter names differ by endpoint: placement and cancellation use `client_order_id`; V4 lookup uses `clientOrderId`. The example preserves those names.

## Recover an uncertain outcome

If a request times out, do not immediately submit another order. Query the persisted client order ID with `getSpotOrderByClientOrderIdV4()`. Use `queryState: 'open'` for open orders and `'history'` for historical orders. The example selects history when `BITMART_QUERY_STATE=history`.

Check open orders, historical orders and trades as needed. A failed open-order lookup does not prove the original request failed. Resolve the order's state before reusing an ID or sending another command. Use `getSpotHistoricOrdersV4()` and `getSpotAccountTradesV4()` with their request-specific bounds and limits to recover missed activity.

## Futures orders

Use `FuturesClientV2` for futures. Its `size` represents contracts, and its numeric `side` and `mode` fields have futures-specific meanings. Read contract details and account position settings before building those requests; do not reuse Spot parameters. You can test supported futures flows with [Futures demo trading](/guides/testing-environments#demo-trading).

[Error handling](/guides/errors) · [Production usage](/guides/production) · [BitMart order reference](https://developer-pro.bitmart.com/en/spot/#new-order-v2-signed)
