---
title: "BitMart SDK proxy configuration"
description: "Configure separate REST and WebSocket proxy routes with Axios and proxy agents."
---

# Use a proxy

<!--@include: @/.vitepress/shared/proxies/scope.md-->

Allow the proxy's egress IP when your key uses an IP allowlist. Keep proxy credentials out of logs.

## HTTP or HTTPS proxy for REST

Pass Axios proxy options in the REST client's second constructor argument:

<<< @/../examples/proxy-rest.ts

<!--@include: @/.vitepress/shared/proxies/rest-options.md-->

## Proxy agents for REST and WebSockets

<!--@include: @/.vitepress/shared/proxies/agent-setup.md-->

<<< @/../examples/proxy-agent.ts

`proxy: false` disables Axios proxy handling, including environment-variable routing, so the custom agent controls the route. Keep `keepAlive: false`; enabling it replaces the custom HTTPS agent with a new Node.js HTTPS agent.

REST options do not route WebSocket traffic. Set `wsOptions.agent` separately. The same REST constructor pattern applies to `FuturesClientV2`.

## SOCKS5

<!--@include: @/.vitepress/shared/proxies/socks.md-->

Use the SOCKS agent for `httpsAgent` and `wsOptions.agent`, retaining `proxy: false` and `keepAlive: false` for REST.

## Verify both transports

Use `getSpotTickerV3({ symbol: 'BTC_USDT' })` and a public ticker subscription to check each path. Verify both connections in proxy logs. A successful REST call alone does not verify the WebSocket route or compressed-message handling.

<!--@include: @/.vitepress/shared/proxies/troubleshooting.md-->
