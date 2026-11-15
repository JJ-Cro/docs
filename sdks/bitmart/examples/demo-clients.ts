import { FuturesClientV2, WebsocketClient } from 'bitmart-api';

// Public demo clients. Add the same apiKey, apiSecret and apiMemo to both
// only when you need authenticated simulated-futures operations.
export const futures = new FuturesClientV2({ demoTrading: true });
export const ws = new WebsocketClient({ demoTrading: true });

// Futures subscriptions select V2 connections. Spot subscriptions remain live.
// await futures.getFuturesContractDetails({ symbol: 'BTCUSDT' });
// await Promise.all(ws.subscribe('futures/ticker:BTCUSDT', 'futures'));
// ws.closeAll();
