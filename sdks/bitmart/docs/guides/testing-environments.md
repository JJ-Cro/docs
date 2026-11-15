---
title: "BitMart futures demo trading"
description: "Configure simulated V2 futures without mistaking live Spot requests for demo trading."
---

# Futures demo trading {#testing-environments}

## Available environments

BitMart offers [simulated V2 futures trading](https://developer-pro.bitmart.com/en/futuresv2/#simulated-trading). Production is the default. The SDK's `demoTrading` flag does not select a Spot sandbox and does not move legacy V1 clients to demo services.

## Futures demo trading {#demo-trading}

<<< @/../examples/demo-clients.ts

`FuturesClientV2({ demoTrading: true })` uses `https://demo-api-cloud-v2.bitmart.com`. V2 futures WebSocket connections use `wss://openapi-wsdemo-v2.bitmart.com`, with public `/api` and private `/user` paths.

BitMart uses the **same API key, secret and memo** for production and simulated futures. Add those values to both clients when you need authenticated demo operations. Because the credentials are shared, explicitly selecting demo on every relevant client is essential. Do not configure `baseUrl` or `wsUrl` overrides unless you intend to replace the SDK's environment selection.

**`RestClient({ demoTrading: true })` remains live. Spot WebSocket subscriptions also remain live.** Use separate client variables for production Spot and simulated V2 futures, and make the environment visible in your application's configuration and logs without exposing credentials.

## Coverage and limitations

Demo trading uses simulated assets and supports the endpoints BitMart lists for that environment. It does not verify production permissions, liquidity, execution quality or regional availability. Check the current exchange documentation for funding the demo account, supported products and endpoint differences. Do not assume every transfer or account operation is simulated merely because a client has the flag.

For Spot, begin with public market data and read-only account calls. Use local fixtures for rejected orders, timeouts, partial fills and reconnect recovery. This release does not expose a Spot testnet or a validate-only option on `submitSpotOrderV2()`.

<!--@include: @/.vitepress/shared/testing/limits.md-->

For BitMart, separate environment configuration even though production and demo use the same credentials. There is no separate demo key to fall back from.

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
