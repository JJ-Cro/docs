---
title: "Gate.io SDK error handling"
description: "Handle REST errors, WebSocket failures and uncertain order outcomes safely."
---

# Error handling

Separate transport failures from exchange rejections and inspect individual results for batch operations.

## REST errors

Successful REST methods return the response body directly. With default error processing, HTTP failures can be thrown as objects containing `code`, `message`, `body`, `headers` and `requestOptions`. Failures without an HTTP response can be underlying errors or strings. Do not assume every caught value is an `Error` with a `.message` property.

Gate API error details commonly include `label` and `message` in the response body. Check the caught value's shape before reading those fields. Record only the fields needed for diagnosis; request options and headers can contain credentials or signatures.

Set `parseExceptions: false` to retain the underlying error instead of the SDK's processed form. This changes error representation, not whether failed requests reject.

## WebSocket errors

Listen for `exception` alongside subscription `response` and data `update` events. Check each subscription acknowledgement for `error` before depending on a channel; a rejected subscription can arrive on `response`. WebSocket API requests reject on errors or a lost connection; their successful result is nested in `data.result`.

Do not log full WebSocket API responses or raw failures. The SDK can attach signed request context. Extract only operation names, response codes and the specific identifiers your application needs.

## Decide whether a retry is safe

- Correct invalid credentials, permissions, environment, pair rules or insufficient funds before retrying.
- Back off with jitter for transient reads and honor exchange rate-limit guidance.
- Treat timed-out order commands as unknown until private events or REST queries resolve the outcome.
- Inspect every batch item. Retry only after determining which operations were accepted.

Keep diagnostic logs free of secrets, signatures and full account payloads.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
