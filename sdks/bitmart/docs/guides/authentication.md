---
title: "BitMart API authentication and account balances"
description: "Configure an API key, secret and memo to read Spot balances or futures account state."
---

# Account access and balances

Authenticated requests require an API key, API secret and the **same memo chosen when creating the key**. The memo is not a new value to invent for each request.

## Configure server-side clients

Save these values in your server environment or secret manager as `BITMART_API_KEY`, `BITMART_API_SECRET` and `BITMART_API_MEMO`. Do not put them in browser code, mobile apps, source control or shared logs.

<<< @/../examples/authenticated-client.ts

Use read permissions for account queries and enable trading only when needed. Withdrawal permission is not required for these examples. Apply an IP allowlist where available and keep the server clock synchronized. The SDK signs requests; do not construct authentication headers yourself.

## Read Spot or futures state

Keep this file beside `authenticated-client.ts` and choose `spot` or `futures` when running it:

<<< @/../examples/account-state.ts

The clients above use production. Spot wallet balances are in `data.wallet`; V2 futures assets are in `data`. Funding-account balances are a separate read through `RestClient.getAccountBalancesV1()`. Use the method for the account whose funds your application needs.

These examples print private account information to your local terminal. Restrict access and avoid forwarding the output to shared logs. For longer lists, follow the endpoint's limits and pagination rather than treating one response as a complete account snapshot.

## Authentication failures

Check all three credentials, API-key permissions, IP restrictions, the selected host and the server clock. An authenticated Spot client is still live when `demoTrading: true` is set; only V2 futures supports [demo trading](/guides/testing-environments#demo-trading).

[Private account updates](/guides/private-streams) · [Error handling](/guides/errors) · [Order management](/guides/orders)
