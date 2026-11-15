---
title: "Gate.io SDK API reference"
description: "Find gateio-api REST and WebSocket methods, request parameters and response types."
---

# API reference

Client methods, parameters and response types exported by [`gateio-api`](https://www.npmjs.com/package/gateio-api). The same API works in JavaScript and TypeScript.

## Clients

- [RestClient](/api/classes/RestClient)
- [WebsocketClient](/api/classes/WebsocketClient)
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient)

## Common methods

| Task | Method |
| --- | --- |
| Spot ticker | [getSpotTicker](/api/classes/RestClient#getspotticker) |
| Pair rules | [getSpotCurrencyPair](/api/classes/RestClient#getspotcurrencypair) |
| Order-book snapshot | [getSpotOrderBook](/api/classes/RestClient#getspotorderbook) |
| Spot candles | [getSpotCandles](/api/classes/RestClient#getspotcandles) |
| Spot balances | [getSpotAccounts](/api/classes/RestClient#getspotaccounts) |
| Submit / amend / cancel | [submitSpotOrder](/api/classes/RestClient#submitspotorder), [updateSpotOrder](/api/classes/RestClient#updatespotorder), [cancelSpotOrder](/api/classes/RestClient#cancelspotorder) |
| Recover one order | [getSpotOrder](/api/classes/RestClient#getspotorder) |
| Open and finished orders | [getSpotOrders](/api/classes/RestClient#getspotorders) |
| Execution history | [getSpotTradingHistory](/api/classes/RestClient#getspottradinghistory) |
| Perpetual-futures tickers | [getFuturesTickers](/api/classes/RestClient#getfuturestickers) |
| Subscribe to updates | [subscribe](/api/classes/WebsocketClient#subscribe) |
| WebSocket order status | [getSpotOrderStatus](/api/classes/WebsocketAPIClient#getspotorderstatus) |

Search methods and types with **⌘K / Ctrl+K**. Use the [authentication](/guides/authentication), [order management](/guides/orders) and [private stream](/guides/private-streams) guides for complete workflows.

[Reference index](/api/) · [Gate API documentation](https://www.gate.com/docs/developers/apiv4/en/)
