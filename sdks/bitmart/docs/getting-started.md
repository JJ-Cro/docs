---
title: "BitMart Node.js quickstart with JavaScript"
description: "Install bitmart-api and read a public BTC_USDT Spot ticker with RestClient."
---

# Node.js quickstart with JavaScript

Read a live BTC_USDT Spot price. No API key, secret or memo is required.

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

<!--@include: @/.vitepress/shared/getting-started/runtime-compatibility.md-->

## Make a request

Save this as `prices.mjs`:

<<< @/../examples/first-call.ts{js}

```sh
node prices.mjs
```

## Example output {#verify-the-result}

```text
BTC_USDT last price: 65000.1
```

Your price will differ. `getSpotTickerV3()` returns an envelope with `code`, `message`, `trace` and `data`. The example reads the decimal string at `data.last`; the SDK does not unwrap `data`.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file and replace the import with `const { RestClient } = require('bitmart-api')`, retaining the async function. TypeScript uses the same import with the SDK's included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Choose a client](/clients) · [Runtime setup](/compatibility)

## TypeScript integrations

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

See [Futures demo trading](/guides/testing-environments#demo-trading) for simulated futures setup and limitations. The Spot request above uses production market data.
