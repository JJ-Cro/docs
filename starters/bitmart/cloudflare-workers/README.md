# BitMart: Cloudflare Workers

Read public market prices with `bitmart-api`. No API key is required for public prices.

Use Node.js 24 and npm.

This REST-only recipe does not establish live runtime compatibility. See the guide for its scope and requirements.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Wrangler. Each request returns the symbol and public price as JSON.

The separate `src/order.js` handler can submit live orders with production credentials. Follow the guide to configure secrets and review order parameters before using `npm run dev:orders`. Starting the server does not submit an order.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitmart/environments/cloudflare-workers.html).
