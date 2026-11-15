---
title: "Gate.io public market data"
description: "Read Spot pair rules, tickers, candles and order-book snapshots with gateio-api."
---

# Public market data

Use `RestClient` without credentials for public data. Spot pair names use underscores, such as `BTC_USDT`. Select products explicitly: perpetual-futures methods also require a settlement currency, and their quantities represent contracts rather than Spot units.

## Read pair rules and market data

Install `gateio-api` and save this as `market-data.ts`:

<<< @/../examples/market-data.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node market-data.ts
```

The example prints pair metadata, a ten-level order-book snapshot and five one-minute candles. Methods return the API response body directly: some return objects, others arrays. Do not add a `.data` access to these REST results.

## Check pair rules

Read `precision`, `amount_precision`, `min_base_amount`, `min_quote_amount` and `trade_status` from `getSpotCurrencyPair()` before submitting an order. Respect the other applicable limits returned for the pair.

Spot limit-order amounts are in the base currency. For Spot market orders, buy amounts are in quote currency and sell amounts are in base currency. Keep decimal amounts as strings when sending requests and use decimal-safe calculations when applying precision rules.

## Candles

`getSpotCandles()` returns tuples containing timestamp, quote volume, close, high, low, open, base volume and the window-closed flag. Use the [SpotCandle type](/api/type-aliases/SpotCandle) for the field order rather than assuming it matches another exchange. A candle still in progress can change.

## Order books {#order-books}

`getSpotOrderBook()` returns bids and asks as `[price, amount]` pairs. Set `with_id: true` to request the snapshot ID. A REST snapshot does not maintain a live book.

For incremental books, buffer `spot.order_book_update` events while fetching a snapshot, then apply updates using the IDs and sequencing rules in the [Spot WebSocket documentation](https://www.gate.com/docs/developers/apiv4/ws/en/#how-to-maintain-local-order-book). Rebuild after a gap before using the book for decisions.

[Streaming](/guides/websockets) · [getSpotTicker reference](/api/classes/RestClient#getspotticker) · [getSpotCurrencyPair reference](/api/classes/RestClient#getspotcurrencypair)
