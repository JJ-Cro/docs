---
title: "HTX SDK runtime setup and compatibility"
description: "Set up @siebly/htx-api for Node.js, browsers, frameworks, Expo and Cloudflare Workers with clear verification limits."
---

# Runtime setup

Each guide starts from an empty directory and includes installation commands, configuration and public price examples.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): strict type checking and build/run commands.
- [Next.js](/environments/next): a server-side price route.
- [Bun](/environments/bun) and [Deno](/environments/deno): npm dependencies and runtime commands.
- [Cloudflare Workers](/environments/cloudflare-workers): public REST reads and an optional authenticated order route.

Keep private operations on your server. Compressed WebSocket messages require `DecompressionStream`; check support in the runtime you deploy.

## Browser applications

The [React](/environments/react) and [Vite](/environments/vite) recipes use the SDK's browser mappings and include EventEmitter resolution. Keep the supplied files together and omit Node-only agents. These examples contain no credentials.

Browser REST access depends on HTX CORS policy, network and regional availability. Use a protected server route when direct requests are unavailable. A development proxy is not a production backend.

## React Native and Expo

The [Expo recipe](/environments/expo) includes Metro configuration and import polyfills. It does **not** polyfill `DecompressionStream`, which the HTX stream requires. Confirm that API exists on your device runtime before using the stream, or relay prices through your backend. A successful bundle alone does not establish native stream support.

## Verification limits

With `@siebly/htx-api` 1.0.8 on Node.js 24.19.0, ES-module and CommonJS imports, TypeScript checks, a public Spot REST price and connection cleanup passed on November 15, 2026. The public WebSocket check received no market update within 25 seconds and reported `ENOTFOUND api-aws.huobi.pro`; live streaming was not verified in that environment.

The Vite and React production bundles and both Cloudflare Worker dry runs passed. These checks do not establish browser CORS access, deployed Worker connectivity, private permissions, order execution or recovery. Bun, Deno, Next.js and native-device execution were not tested.

Before deploying, exercise public REST, subscription acceptance, receipt of a price, graceful shutdown and recovery in your target environment. Test authenticated reads and trading separately under explicit controls.

## Streaming lifecycle

The Node.js starter closes after the first valid price or a failure. Browser and mobile views close connections on unmount or Stop. The standalone guide stream runs until Ctrl+C. Automatic resubscription does not guarantee that missed state is replayed.

[Public streams](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
