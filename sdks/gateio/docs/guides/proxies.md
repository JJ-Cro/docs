---
title: "Gate.io SDK proxy configuration"
description: "Route gateio-api REST and WebSocket traffic through HTTP, HTTPS or SOCKS proxies."
---

# Use a proxy

<!--@include: @/.vitepress/shared/proxies/scope.md-->

Allow the proxy's egress IP when your API key has an IP allowlist. Keep proxy credentials out of logs.

## HTTP or HTTPS proxy for REST

Pass Axios proxy options in the REST client's second constructor argument:

<<< @/../examples/proxy-rest.ts

<!--@include: @/.vitepress/shared/proxies/rest-options.md-->

## Proxy agents for REST and WebSockets

<!--@include: @/.vitepress/shared/proxies/agent-setup.md-->

<<< @/../examples/proxy-agent.ts

`proxy: false` disables Axios proxy handling so the custom agent controls the route. Keep `keepAlive: false`; enabling it creates a new HTTPS agent instead of using the supplied agent directly.

REST settings do not route WebSocket traffic. Set `wsOptions.agent` separately, including on `WebsocketAPIClient` when sending WebSocket commands. Gate private subscriptions use signed messages rather than fetching a REST token.

## SOCKS5

<!--@include: @/.vitepress/shared/proxies/socks.md-->

Use the SOCKS agent for both `httpsAgent` and `wsOptions.agent`, retaining `proxy: false` and `keepAlive: false` for REST.

## Verify both transports

Make a public `getSpotTicker({ currency_pair: 'BTC_USDT' })` request and subscribe to `spot.tickers` with the configured clients. Confirm both connections in proxy logs. A successful REST request does not verify WebSocket routing.

<!--@include: @/.vitepress/shared/proxies/troubleshooting.md-->
