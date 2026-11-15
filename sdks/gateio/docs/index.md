---
title: "Gate.io API SDK for Node.js, JavaScript and TypeScript"
description: "Use gateio-api for Gate.io REST requests, public market streams, private account updates and WebSocket trading APIs."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# Gate.io API SDK

[`gateio-api`](https://www.npmjs.com/package/gateio-api) provides JavaScript and TypeScript clients for Gate.io (Gate.com) Spot, margin and derivatives APIs. Read market data, follow account changes and manage orders through typed REST and WebSocket methods.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Follow the [Node.js quickstart](/getting-started) to read a public Bitcoin price without credentials. Examples use live services by default. For testing with simulated funds, [configure TestNet](/guides/testing-environments).

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read market data](/guides/market-data) or [stream tickers](/guides/websockets).
- [Read account balances](/guides/authentication) and [subscribe to private updates](/guides/private-streams).
- [Place, amend and cancel Spot orders](/guides/orders).
- [Send WebSocket API requests](/guides/websocket-api).
- [Configure your clients](/guides/configuration), [prepare for production](/guides/production) or [browse the reference](/reference).
