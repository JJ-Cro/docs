---
title: "Gate.io Spot order management"
description: "Place, observe, amend and cancel a Spot limit order with gateio-api."
---

# Spot order management

Use `RestClient` to manage a BTC_USDT Spot order. The examples use live services by default, so running `place` can spend real funds. For simulated funds, configure [TestNet](/guides/testing-environments) before running any order command.

## Before submitting

1. Configure [authenticated access](/guides/authentication) with read and trading permissions.
2. Read current pair rules with [`getSpotCurrencyPair()`](/api/classes/RestClient#getspotcurrencypair). Choose price and amount strings that meet precision, minimums and current limits.
3. Start the [private order and fill stream](/guides/private-streams) with the same account and environment. Confirm the subscriptions before placing orders.
4. Record a unique client order identifier in the `text` field before sending. It must begin with `t-`, followed by at most 28 bytes using letters, digits, underscores, hyphens or dots.

Add your own values to `.env`:

```dotenv
GATEIO_CLIENT_ORDER_ID=t-spotExample20261115001
GATEIO_LIMIT_PRICE=60000
GATEIO_ORDER_SIZE=0.0001
GATEIO_NEW_PRICE=59000
```

Replace the example prices and amount with values that meet the current pair rules. For this buy order, choose a price below the best bid. `time_in_force: 'poc'` requests post-only handling, but an accepted resting order can still fill before you cancel it.

## Place, inspect, amend or cancel

Save this as `first-order.ts` beside the [credential helper](/guides/authentication). Follow its [compile instructions](/guides/authentication#compile-and-run-the-examples), using `first-order.ts` as the entry file:

<<< @/../examples/first-order.ts

Run one command at a time:

```sh
node --env-file=.env dist/first-order.js place
node --env-file=.env dist/first-order.js status
node --env-file=.env dist/first-order.js amend
node --env-file=.env dist/first-order.js cancel
```

Placement uses `GATEIO_CLIENT_ORDER_ID`. After a successful placement, save the returned exchange order `id` as `GATEIO_ORDER_ID` in `.env`; status, amendment and cancellation use that ID when provided, otherwise they use the client identifier. Clear `GATEIO_ORDER_ID` before starting a different order workflow.

Gate supports custom `text` lookups while an order is pending and for only one hour after it finishes. Keep the exchange ID for later follow-up reads. A unique `text` helps correlate requests; do not assume it makes resubmission safe or prevents duplicate orders.

The example explicitly selects `account: 'spot'` and a limit order. Spot limit amounts are in base currency. A successful response confirms the request result, not that the order remains open. Inspect status and fills before deciding what to do next.

## Recover an uncertain outcome

A timeout or disconnect does not prove the exchange rejected the command. Check private events, then query `getSpotOrder()` using the saved exchange or client identifier. If necessary, search finished orders with `getSpotOrders({ status: 'finished', ... })` and executions with `getSpotTradingHistory()`.

Paginate the relevant history and allow for delayed records. Do not submit a replacement while the first outcome remains unknown. An order can fill while an amendment or cancellation is being processed, so reconcile executed quantity as well as the command response.

For batch operations, inspect each item's result. Do not assume the entire batch succeeded or failed together.

[Error handling](/guides/errors) · [WebSocket API requests](/guides/websocket-api) · [Gate Spot API](https://www.gate.com/docs/developers/apiv4/en/#spot)
