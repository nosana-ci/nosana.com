---
title: "Nosana authentication for agents"
description: "How an automated client obtains and uses credentials for the Nosana API: API keys today, and Nosana Connect (OAuth 2.1 with PKCE) in preview."
canonical: "https://nosana.com/auth.md"
---

# Authenticating with Nosana

This document follows the [auth.md](https://github.com/workos/auth.md)
convention: a walkthrough an automated client can read to work out how to get
credentials for the Nosana API and use them.

The API is at `https://api.nosana.com`, described by an
[OpenAPI 3.1 document](https://api.nosana.com/api/openapi.json).

## Discover

There is no `service_auth` or `agent_auth` metadata document on this domain, and
no `identity_endpoint`, so an `identity_assertion` or `id-jag` exchange is not
available. This document is the discovery path.

Machine-readable starting points:

- **API surface** — <https://api.nosana.com/api/openapi.json>, with a catalog at
  <https://nosana.com/.well-known/api-catalog>
- **OIDC metadata** for the authorization server —
  `https://dashboard.k8s.prd.nosana.com/api/auth/.well-known/openid-configuration`.
  Read `authorization_endpoint`, `token_endpoint` and `revocation_endpoint` from
  it rather than hard-coding URLs.

Two limits to know before you start. Protected endpoints answer `401` with a
JSON body but **no `WWW-Authenticate` header**, so do not wait for a challenge to
learn where to authenticate. And the metadata document declares an `issuer` on a
different host from the one serving it, so a client that compares the two
strictly should expect that mismatch.

## Pick a method

| Method | Status | Use when |
| --- | --- | --- |
| **API key** | Available | Any automated client: CI, a server, an agent. No browser needed |
| **Nosana Connect** (OAuth 2.1 + PKCE) | Preview | A user is present and should authorise on their own account |

**If you are an agent, use an API key.** Both are sent identically, so code
written against one works with the other when Connect leaves preview.

## Register

**Neither method supports self-registration.** The authorization server
advertises no `registration_endpoint`, so a client cannot mint its own
credentials. A person does one of the following at
<https://deploy.nosana.com/>:

- **API key** — create one under API keys. Keys are prefixed `nos_` and may be
  given an expiry. See
  [Get an API key](https://docs.nosana.com/api/get-api-key).
- **Nosana Connect** — register an application under Connected Apps to receive a
  client id prefixed `stcl_`, and declare your redirect URIs there. Only
  registered redirect URIs are accepted, so a loopback client must register the
  exact port it listens on.

## Claim

For an API key there is nothing to claim: the string shown at creation *is* the
credential, and it is shown once. Store it as a secret.

For Nosana Connect, begin the authorization-code flow:

1. Fetch the OIDC metadata and read `authorization_endpoint`.
2. Generate a PKCE code verifier and send the user to the authorization
   endpoint with `response_type=code`, your `client_id`, a registered
   `redirect_uri`, `scope` (`openid offline_access` for a refreshable session),
   `code_challenge`, `code_challenge_method=S256` and a random `state`.
3. The user signs in — email and password, Google, or GitHub — and returns to
   your `redirect_uri` with `code` and `state`. Verify `state` matches.

## Exchange

An API key needs no exchange. Skip to *Use the access_token*.

For Nosana Connect, POST to the `token_endpoint` from the metadata document with
`grant_type=authorization_code`, the `code`, the same `redirect_uri`, your
`client_id` and the `code_verifier`. The response is a standard token set:
`access_token`, `token_type`, `expires_in`, and a `refresh_token` when
`offline_access` was requested. Refresh with `grant_type=refresh_token` before
expiry, keeping your existing refresh token if the server does not rotate it.

A confidential client that can hold a secret may send `client_secret` and skip
PKCE. A public client — a CLI, a desktop agent — must use PKCE and must not
embed a secret.

While Connect is in preview the token exchange is not yet available in
production. Use an API key until this note is removed.

## Use the access_token

Send the credential as a bearer token on every request. Identical for both
methods:

```http
GET /api/deployments HTTP/1.1
Host: api.nosana.com
Authorization: Bearer <access_token, or a nos_… API key>
```

A check that costs nothing:

```bash
curl -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://api.nosana.com/api/credits/balance
```

Public endpoints need no credential, so use one to confirm connectivity first:

```bash
curl https://api.nosana.com/api/markets/
```

## Errors

| Status | Meaning | What to do |
| --- | --- | --- |
| `401` | Missing, malformed, expired or revoked credential | Refresh, or stop and obtain a new key. Do not retry unchanged |
| `403` | Authenticated but not permitted | Do not retry; the account lacks access |
| `400` | Malformed request | Fix it; the JSON body says what was wrong |
| `402` | Out of credits | Top up. See [pricing](https://nosana.com/pricing.md) |

Errors are JSON. Since there is no `WWW-Authenticate` header on a `401`, branch
on the status code.

## Revocation

- **API keys** are deleted or deactivated in the dashboard, effective
  immediately; an expired key is rejected on next use.
- **OAuth tokens** are revoked by POSTing to the `revocation_endpoint` in the
  metadata document, or by ending the session at its `end_session_endpoint`.
  Discard your stored refresh token at the same time.

Treat a `401` following a working period as revocation rather than a transient
fault: re-authenticate deliberately instead of looping.
