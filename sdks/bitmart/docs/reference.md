---
title: "BitMart SDK API reference"
description: "Find BitMart REST and WebSocket client methods, request parameters and response types."
---

# API reference

Client methods, parameters and response types exported by [`bitmart-api`](https://www.npmjs.com/package/bitmart-api). JavaScript and TypeScript use the same client methods.

## Clients

- [RestClient](/api/classes/RestClient)
- [FuturesClientV2](/api/classes/FuturesClientV2)
- [WebsocketClient](/api/classes/WebsocketClient)

## Common methods

| Task | Method |
| --- | --- |
| Public Spot ticker | [getSpotTickerV3](/api/classes/RestClient#getspottickerv3) |
| Spot trading rules | [getSpotTradingPairDetailsV1](/api/classes/RestClient#getspottradingpairdetailsv1) |
| Spot order book | [getSpotOrderBookDepthV3](/api/classes/RestClient#getspotorderbookdepthv3) |
| Spot balances | [getSpotWalletBalanceV1](/api/classes/RestClient#getspotwalletbalancev1) |
| Place or cancel a Spot order | [submitSpotOrderV2](/api/classes/RestClient#submitspotorderv2), [cancelSpotOrderV3](/api/classes/RestClient#cancelspotorderv3) |
| Recover a Spot order | [getSpotOrderByClientOrderIdV4](/api/classes/RestClient#getspotorderbyclientorderidv4) |
| Open Spot orders and trades | [getSpotOpenOrdersV4](/api/classes/RestClient#getspotopenordersv4), [getSpotAccountTradesV4](/api/classes/RestClient#getspotaccounttradesv4) |
| Futures contract metadata | [getFuturesContractDetails](/api/classes/FuturesClientV2#getfuturescontractdetails) |
| Futures balances and positions | [getFuturesAccountAssets](/api/classes/FuturesClientV2#getfuturesaccountassets), [getFuturesAccountPositions](/api/classes/FuturesClientV2#getfuturesaccountpositions) |
| Subscribe to updates | [subscribe](/api/classes/WebsocketClient#subscribe) |

Search methods and types with **⌘K / Ctrl+K**. See the [client guide](/clients), [authentication](/guides/authentication) and [order lifecycle](/guides/orders) for complete workflows.

[Reference index](/api/) · [BitMart Spot API](https://developer-pro.bitmart.com/en/spot/) · [BitMart V2 futures API](https://developer-pro.bitmart.com/en/futuresv2/)
