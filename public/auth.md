---
title: "Nosana authentication for agents"
description: "How agents and applications authenticate with the Nosana REST API and OAuth-protected MCP server."
canonical: "https://nosana.com/auth.md"
---

# Authenticating with Nosana

This document follows the [auth.md](https://github.com/workos/auth.md)
convention: a walkthrough an automated client can read to work out how to get
credentials for the Nosana API and use them.

The API is at `https://api.nosana.com`, described by an
[OpenAPI 3.1 document](https://api.nosana.com/openapi.json).

## Discover

The remote MCP server publishes RFC 9728 protected-resource metadata at
`https://api.nosana.com/.well-known/oauth-protected-resource`. MCP clients
follow that document to the authorization server automatically. This document
explains the same choices for direct API integrations.

Machine-readable starting points:

- **MCP resource** — <https://api.nosana.com/mcp>, with discovery metadata at
  <https://api.nosana.com/.well-known/oauth-protected-resource>
- **API surface** — <https://api.nosana.com/openapi.json>, with a catalog at
  <https://nosana.com/.well-known/api-catalog>
- **Authorization server metadata** —
  `https://client-manager.k8s.prd.nosana.com/.well-known/oauth-authorization-server/auth`.
  Read its authorization, token and registration endpoints rather than
  hard-coding them.

Direct REST endpoints return JSON on `401`; the MCP endpoint additionally sends
a `WWW-Authenticate` challenge pointing to its protected-resource metadata. The
authorization server uses PKCE and supports dynamic client registration for MCP
clients.

## Pick a method

| Method | Status | Use when |
| --- | --- | --- |
| **API key** | Available | Any automated client: CI, a server, an agent. No browser needed |
| **Nosana MCP OAuth** (OAuth 2.1 + PKCE) | Available | A compatible MCP client acts for a signed-in user |

Use MCP OAuth when connecting an assistant to the remote MCP server. Use an API
key for headless REST or SDK integrations where no person can complete browser
consent.

## Register

**API keys** are created by a person under API Keys in the dashboard. Keys are
prefixed `nos_` and may be given an expiry. See [Get an API key](https://docs.nosana.com/api/get-api-key).

**MCP clients register themselves dynamically.** Start with the MCP URL; the
client discovers the OAuth registration endpoint, registers its redirect URI,
opens browser consent and stores the resulting token. Standalone OAuth apps that
are not MCP clients can still be registered under Connected Apps in the
dashboard.

## Claim

For an API key there is nothing to claim: the string shown at creation *is* the
credential, and it is shown once. Store it as a secret.

MCP clients handle the following authorization-code flow automatically. For a
direct OAuth integration:

1. Fetch the authorization-server metadata and read `authorization_endpoint`.
2. Generate a PKCE code verifier and send the user to the authorization
   endpoint with `response_type=code`, your `client_id`, a registered
   `redirect_uri`, `scope` (`openid offline_access` for a refreshable session),
   `code_challenge`, `code_challenge_method=S256` and a random `state`.
3. The user signs in — email and password, Google, or GitHub — and returns to
   your `redirect_uri` with `code` and `state`. Verify `state` matches.

## Exchange

An API key needs no exchange. Skip to *Use the access_token*.

For direct OAuth, POST to the `token_endpoint` from the metadata document with
`grant_type=authorization_code`, the `code`, the same `redirect_uri`, your
`client_id` and the `code_verifier`. The response is a standard token set:
`access_token`, `token_type`, `expires_in`, and a `refresh_token` when
`offline_access` was requested. Refresh with `grant_type=refresh_token` before
expiry, keeping your existing refresh token if the server does not rotate it.

A confidential client that can hold a secret may send `client_secret` and skip
PKCE. A public client — a CLI, a desktop agent — must use PKCE and must not
embed a secret.

## Use the access_token

Send the credential as a bearer token on every request. Identical for both
methods:

```http
GET /deployments HTTP/1.1
Host: api.nosana.com
Authorization: Bearer <access_token, or a nos_… API key>
```

A check that costs nothing:

```bash
curl -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://api.nosana.com/credits/balance
```

Public endpoints need no credential, so use one to confirm connectivity first:

```bash
curl https://api.nosana.com/markets/
```

## Errors

| Status | Meaning | What to do |
| --- | --- | --- |
| `401` | Missing, malformed, expired or revoked credential | Refresh, or stop and obtain a new key. Do not retry unchanged |
| `403` | Authenticated but not permitted | Do not retry; the account lacks access |
| `400` | Malformed request | Fix it; the JSON body says what was wrong |
| `402` | Out of credits | Top up. See [pricing](https://nosana.com/pricing.md) |

Errors are JSON. Direct API callers should branch on the status code. MCP
clients should follow the `WWW-Authenticate` challenge and re-authorize when a
token is missing, expired or revoked.

## Revocation

- **API keys** are deleted or deactivated in the dashboard, effective
  immediately; an expired key is rejected on next use.
- **OAuth tokens** are cleared by disconnecting the MCP integration or ending
  its session. Discard locally stored access and refresh tokens at the same time.

Treat a `401` following a working period as revocation rather than a transient
fault: re-authenticate deliberately instead of looping.
