---
title: "BitMart public market data with REST"
description: "Read Spot tickers, order books and trading rules, and inspect V2 futures contract metadata."
---

# Public market data

Public reads do not require credentials. Start with the [ticker quickstart](/getting-started), then use the product-specific methods below.

## Spot order books and futures contracts

<<< @/../examples/market-data.ts

Spot uses `BTC_USDT`; futures uses `BTCUSDT`. Spot V3 order-book levels contain price and amount strings. `getSpotTradingPairDetailsV1()` supplies Spot trading rules, while futures contract details include contract-specific sizes and limits. Read the current rules before constructing an order.

## Response shapes and numbers

REST responses retain the `code`, `message`, `trace` and `data` envelope. `getSpotTickerV3()` returns one ticker object, whereas `getSpotTickersV3()` returns arrays whose positions represent ticker fields. Use the corresponding response type rather than assuming every ticker method returns the same shape.

Keep decimal-valued prices and quantities as strings where the request type accepts strings. Futures order `size` instead requires a number of contracts. Convert for display only when the rounding is acceptable; use decimal arithmetic for calculations that determine order quantities or prices.

## Candles and snapshots

Use `getSpotLatestKlineV3()` or `getSpotHistoryKlineV3()` for Spot candles and `FuturesClientV2.getFuturesKlines()` for futures. Inspect each request type for time units, bounds and limits. A single response is not necessarily the complete history.

An order-book REST response is a snapshot at one point in time. To maintain a live book, follow the selected exchange channel's snapshot, update and ordering rules. A ticker stream is not a substitute for an order book.

[Public streams](/guides/websockets) · [API reference](/reference) · [BitMart Spot reference](https://developer-pro.bitmart.com/en/spot/)
