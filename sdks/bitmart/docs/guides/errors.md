---
title: "BitMart SDK error handling"
description: "Distinguish transport errors, API response codes and uncertain order outcomes."
---

# Error handling

REST rejections and stream exceptions need separate handling. Keep diagnostic fields useful without logging credentials or complete private payloads.

## REST responses

Successful methods return the full API envelope, normally with numeric `code: 1000`. The SDK rejects HTTP 200 responses when `code` is a number other than `1000`. It does not unwrap `data` or validate every field in a successful payload, so also check the result expected by your operation.

By default, parsed HTTP errors contain `code` for the **HTTP status**, `message` for the status text and `body` for the exchange response. For an API rejection over HTTP 200, read `body.code` and `body.message`; the outer `code` can still be `200`.

Caught values are not always `Error` objects. Request-setup failures can be strings, and network failures without a response can retain an Axios object. Narrow the caught value before reading fields. `parseExceptions: false` preserves the underlying error or wrapper; it does not turn failures into successful results.

## WebSocket responses

Handle `exception` and inspect subscription `response` events as well as `update`. A connected socket or successful login does not prove the requested channel is active. Compressed-message decoding failures can be logged by the SDK; monitor connection health and freshness instead of relying on exception events alone.

## Retry policy

- Fix invalid parameters, permissions, IP restrictions or insufficient funds before retrying.
- Back off transient read failures with jitter and respect exchange rate limits.
- Resolve timed-out orders and cancellations through saved IDs, account events and REST state before sending another command.
- Inspect batch results individually. A partially successful operation does not justify repeating the entire batch.

Keep operation names, timestamps, order IDs and sanitized API codes. Avoid whole errors and request configurations, which can contain custom headers, proxy details or signed payloads. Leave `BITMARTTRACE` disabled with real credentials: trace output can include full requests and account data.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
