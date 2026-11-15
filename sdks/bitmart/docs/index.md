---
title: "BitMart API SDK for Node.js, JavaScript and TypeScript"
description: "Use bitmart-api for Spot and futures REST, public market streams, account updates and order management."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# BitMart API SDK

[`bitmart-api`](https://www.npmjs.com/package/bitmart-api) provides JavaScript and TypeScript clients for BitMart Spot and futures APIs. Read prices, manage orders and receive account updates through REST and WebSocket connections.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Start with the [Node.js quickstart](/getting-started) to read a public BTC_USDT Spot ticker without credentials. Examples use production services by default. [Futures demo trading](/guides/testing-environments#demo-trading) is available through `FuturesClientV2`; it does not apply to Spot.

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read public market data](/guides/market-data) or [subscribe to tickers](/guides/websockets).
- [Read account balances](/guides/authentication) and [subscribe to private updates](/guides/private-streams).
- [Place, inspect and cancel a Spot order](/guides/orders).
- Choose a [runtime setup](/compatibility) or browse the [API reference](/reference).
