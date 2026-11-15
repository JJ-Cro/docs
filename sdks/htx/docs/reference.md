---
title: "HTX JavaScript and TypeScript API reference"
description: "Browse @siebly/htx-api clients, method signatures, request parameters, responses and WebSocket types."
---

# API reference

The reference is generated from the exact released SDK source. Use the guides for workflow examples, then open the relevant client or type for parameters and response fields.

## Clients

<!--@include: ./clients.md#client-list-->

## Types and helpers

[All exports](/api/) lists request and response types, WebSocket connection keys and helpers. Spot responses may carry `data` or `tick`; derivatives endpoints can use different envelopes. Read the return type of the specific method you call.

Some exported helpers support the SDK's internal transports. Their presence does not make them necessary for ordinary client usage. Keep signatures, connection recovery and compression handling with the client unless your integration has a specific reason to customize them.

[Choose a client](/clients) · [Configuration](/guides/configuration) · [Error handling](/guides/errors)
