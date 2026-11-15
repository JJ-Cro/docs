# BitMart: Next.js

Read public market prices with `bitmart-api`. No API key is required for public prices.

Use Node.js 24 and npm.

This REST-only recipe does not establish live runtime compatibility. See the guide for its scope and requirements.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open `http://localhost:3000/api/price`. A successful response contains the symbol and price as JSON.

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitmart/environments/next.html).
