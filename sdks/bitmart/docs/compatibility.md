---
title: "BitMart SDK runtime setup and compatibility"
description: "Set up bitmart-api for Node.js, frameworks and other runtimes with explicit streaming limitations."
---

# Runtime setup

The setup guides include installation commands, configuration and public price examples. Keep credentials and private account operations on your server.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): typed imports and build/run commands.
- [Next.js](/environments/next): a server route for public REST data.
- [Bun](/environments/bun) and [Deno](/environments/deno): npm imports and runtime-specific commands.
- [Cloudflare Workers](/environments/cloudflare-workers): public REST and an optional authenticated Spot order route.

BitMart's compressed WebSocket decoder uses `Buffer`, `Response`, Web Streams and `DecompressionStream('deflate-raw')`. Check those APIs in your runtime. A long-running Node.js stream is not a Worker request handler; use the Worker REST recipe rather than copying the streaming lifecycle into an edge request.

## Browser applications

Use the full [React](/environments/react) or [Vite](/environments/vite) configuration. Browser REST requests still depend on BitMart's CORS policy and regional/network access. Use a server route when direct access is blocked; never add secrets to a frontend bundle.

This SDK release recognizes compressed WebSocket data as Node.js buffers. Browser WebSockets normally deliver binary frames as `Blob` or `ArrayBuffer`, which this decoder does not handle. Import or bundling polyfills alone do not resolve that mismatch. Use a server-side stream for production browser consumers unless you have separately verified your transport's message handling.

## React Native and Expo

The [Expo guide](/environments/expo) includes Metro and polyfill configuration. It is a starting point, not evidence of device support. Native binary frames and decompression APIs need separate testing on the target platform. Keep private operations on a server and use a backend for streams where the native transport is incompatible.

## Verification limits

All 11 examples type-check against `bitmart-api@2.5.1`. The Vite production build passed, and both Cloudflare Worker entry points bundled successfully in Wrangler dry runs. These checks establish build compatibility, not successful exchange requests, compressed stream delivery or recovery.

A bounded public connectivity check used the released `bitmart-api@2.5.1` package on Node.js v24.19.0. The REST request failed with `read ECONNRESET`. The Spot WebSocket attempt logged `getaddrinfo ENOTFOUND ws-manager-compress.bitmart.com` and reached its 25-second deadline without receiving a market update. Neither live check succeeded. These results do not establish whether the cause was the SDK, the local network or the exchange.

No Worker deployment, native-device testing or private API requests were performed. Test public REST, a market-data subscription and connection shutdown in your deployment runtime and region before adding private account operations.

## Streaming lifecycle

Stop command-line streams with Ctrl+C and close view-owned connections on disposal. The SDK restores subscriptions after reconnecting, but application state still needs a freshness check and account reconciliation.

[Public streams](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
