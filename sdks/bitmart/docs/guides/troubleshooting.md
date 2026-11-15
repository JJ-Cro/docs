---
title: "Troubleshoot BitMart SDK connections and API errors"
description: "Resolve credential, product, environment, order and runtime setup issues in bitmart-api."
---

# Troubleshooting

## Start with a public request

Run the [quickstart](/getting-started) from the intended deployment environment. Check its network access, region and runtime before adding credentials. A timeout does not identify whether the cause is the SDK, network or exchange.

## Authentication fails

Check `apiKey`, `apiSecret` and the original `apiMemo`, then permissions, IP allowlists and server time. Look at the exchange code in an error's `body`, not only the outer HTTP status. Keep `BITMARTTRACE` off with real credentials.

## A demo request reaches production

Only `FuturesClientV2` and V2 futures WebSockets support `demoTrading`. `RestClient` and Spot subscriptions stay live. Check every client, and remove unintended `baseUrl` or `wsUrl` overrides. See [Futures demo trading](/guides/testing-environments#demo-trading).

## A method or response field differs

Match the method to its client and endpoint version. Spot uses `BTC_USDT` and futures uses `BTCUSDT`. REST Spot V3 tickers use `data.last`; Spot ticker streams use `data[].last_price`. Do not copy response handling between those APIs without checking the type and channel.

## A subscription connects but shows no prices

Handle `response` and `exception`, then verify the topic and market. The `subscribe()` return value is an array: await `Promise.all(...)`. Check the SDK logs and runtime support for compressed messages. Browser/mobile binary frames can differ from Node.js buffers; follow the [runtime limitations](/compatibility).

## An order times out or cancellation races a fill

Resolve the saved client order ID through open and historical order queries, account updates and trade history. Do not blindly repeat placement. See [Order recovery](/guides/orders#recover-an-uncertain-outcome).

## TypeScript and module setup

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

Use `.mjs` for ES modules or `.cjs` with `require()` for CommonJS. Keep imports and the project's module configuration consistent. For browser or Expo bundling, start with the complete [runtime recipe](/compatibility), not just an SDK import.

[Configuration](/guides/configuration) · [Error handling](/guides/errors) · [API reference](/reference)
