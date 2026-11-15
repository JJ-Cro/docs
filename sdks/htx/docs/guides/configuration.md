---
title: "HTX SDK client configuration"
description: "Configure REST timeouts, connection domains, WebSocket options and server-side credentials."
---

# Configuration

REST clients accept SDK options in the first constructor argument and Axios network options in the second. WebSocket clients use their own configuration object.

## REST and WebSocket options

<<< @/../examples/configure-rest.ts

This Node.js example chooses the AWS production domains explicitly. It only constructs clients. `timeout` is an Axios network option, while `keepAlive` enables a Node.js HTTPS agent. Omit Node-only agents in browsers and Workers.

Use `apiKey` and `apiSecret` for private calls. Set credentials independently on every REST or WebSocket client that needs them.

## Domains are not test environments

`baseUrlKey` selects a REST domain for the intended product. `SpotClient` defaults to `spotAWS`; `FuturesClient` defaults to `futuresAWS`. `spotAWS`, `futuresAWS` and `futuresAlt1` are alternative production routes, not sandboxes.

WebSockets default to AWS domains. Use `wsEnvironment: 'standard'` or `'aws'` to choose explicitly. If omitted, the SDK can infer the network from an embedded `restOptions.baseUrlKey`. This is local to that WebSocket client, not configuration shared with a separately created REST client.

The released SDK has no `testnet` or `demoTrading` option. See [Testing without orders](/guides/testing-environments#test-without-placing-orders). A custom `baseUrl` or `wsUrl` changes the destination; it does not establish that a service supports simulation.

## Time and errors

Synchronize the host clock before troubleshooting signatures. `customTimestampFn` lets a REST integration supply its own timestamp source; it is not automatic clock synchronization. `parseExceptions` controls error normalization, not whether failed requests succeed.

Use the [client reference](/reference) for the complete option types. Do not assume options from another exchange SDK exist here.

[Proxies](/guides/proxies) · [Error handling](/guides/errors) · [Production usage](/guides/production)
