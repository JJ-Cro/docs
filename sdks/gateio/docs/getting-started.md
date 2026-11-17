---
title: "Gate.io Node.js quickstart with JavaScript"
description: "Install gateio-api and read a public BTC_USDT ticker with plain JavaScript."
---

# Node.js quickstart with JavaScript

Read the live BTC_USDT last price. This public request needs no API key or secret.

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

Your price will differ. `getSpotTicker()` returns an array, even when you request one pair. Price and quantity fields such as `last` are decimal strings. Pair names use underscores, as in `BTC_USDT`.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file, replace the import with `const { RestClient } = require('gateio-api')`, and keep the async function. TypeScript uses the same import with included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Runtime setup](/compatibility) · [API reference](/reference)

## TypeScript integrations

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

See [TestNet](/guides/testing-environments#testnet) for testing credentials, client settings and limitations.
