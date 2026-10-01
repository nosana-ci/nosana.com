---
title: "Nosana pricing"
description: "How Nosana GPU pricing works: per-second billing on a per-GPU market, paid with credits or NOS. Live prices are available from the public API."
canonical: "https://nosana.com/pricing.md"
---

# Nosana pricing

Nosana has no plans or tiers. You pay for the GPU time you use, per second, at
the price of the **market** you deploy to. A market is one GPU model in one
tier, and each market carries its own price.

**Prices are set per market and change, so this file is a snapshot. The
authoritative, live source is one unauthenticated request:**

```bash
curl https://api.nosana.com/api/markets/
```

Each market in that response carries `name`, `type`, `usd_reward_per_hour`,
`nos_job_price_per_second` and a `metadata` array that includes VRAM. There is
no authentication required to read it, so an agent can compare prices before
holding any credential.

## How you are billed

- **Per second**, from when a job starts running on a host until it stops.
- **Per replica.** A deployment with three replicas costs three times one.
- **By market**, not by usage within the GPU — you hold the whole GPU for the
  duration.
- A deployment's `timeout` is its maximum lifetime in **minutes**, and it caps
  the spend. Credit-funded deployments require a timeout of at least 60 minutes.

## Tiers

Markets come in tiers that trade price against guarantees:

| Tier | What it means |
| --- | --- |
| `PREMIUM` | Hosts that have staked and passed benchmarking. Use for anything user-facing |
| `COMMUNITY` | Same GPU models at a lower price, from hosts with a lower stake requirement |
| `OTHER` | Multi-GPU and specialised nodes, priced individually |

## Indicative prices

A snapshot taken 2026-09-03, in USD per GPU-hour, across 46 priced markets:

| Market | Tier | USD / hour |
| --- | --- | --- |
| NVIDIA 3060 Community | `COMMUNITY` | 0.0327 |
| NVIDIA 3060 | `PREMIUM` | 0.0436 |
| NVIDIA 4090 Community | `COMMUNITY` | 0.2182 |
| NVIDIA 4090 | `PREMIUM` | 0.2909 |
| NVIDIA 5090 | `PREMIUM` | 0.3636 |
| NVIDIA H100 Community | `COMMUNITY` | 1.0227 |
| NVIDIA H100 | `PREMIUM` | 1.3636 |

Community markets currently span 0.0327–1.0227 USD/hour and premium markets
0.0436–1.3636 USD/hour. Multi-GPU nodes are higher; the 8×H100 market is
18.20 USD/hour for all eight cards.

## Paying

**Credits** are the usual route. New accounts get free credits on sign-up at
<https://deploy.nosana.com/>. Check a balance with:

```bash
curl -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://api.nosana.com/api/credits/balance
```

A deployment that runs out of credits stops rather than accruing a debt, and
API calls that would overspend answer `402`.

**NOS**, the network's SPL token, can fund deployments directly from a Solana
wallet through a vault. Job prices are denominated in NOS per second
(`nos_job_price_per_second`), so the USD figures above move with the token
price. See [the NOS token](https://nosana.com/nosana-token/).

## Free of charge

Reading is free and unauthenticated: markets, market metadata, node and network
statistics, and the [OpenAPI document](https://api.nosana.com/openapi.json).
Only deployments consume credits.

## Earning instead of paying

Providers are paid for the time their GPU spends running jobs, at the same
market price, less a network fee shown per market as
`network_fee_percentage`. See [Provide GPUs](https://nosana.com/gpu-providers/).

## More

- [Credits API](https://docs.nosana.com/api/credits)
- [Payments](https://docs.nosana.com/api/payments)
- [GPU markets](https://docs.nosana.com/deployments/gpu-markets)
- [Authentication for agents](https://nosana.com/auth.md)
