# BitMart: Node.js / TypeScript

Read public market prices with `bitmart-api`. No API key is required for public prices.

Use Node.js 24 and npm.

This is a setup recipe, not live runtime verification. WebSocket decompression requires DecompressionStream with deflate-raw, Response and Web Streams. Use Node.js 24 or verify those APIs in your chosen runtime.

## Run

From this folder:

```sh
npm install
npm start
```

The script prints a public REST price and exits.

To stream WebSocket prices until Ctrl+C:

```sh
npm run stream
```

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitmart/environments/typescript.html).
