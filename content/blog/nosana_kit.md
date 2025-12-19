---
title: "Introducing `@nosana/kit`, the comprehensive 2.0 toolchain for Nosana"
description: "Comprehensive toolchain for managing jobs, markets, runs, and protocol operations on the Nosana compute network."
img: /img/NosanaDeploymentManagerBlog.jpg
createdAt: "2025-12-23"
tags:
  - product
---

The Nosana Network is evolving, and so is the way you integrate with it. Today, we're excited to announce **Nosana Kit v2.0** – a complete rewrite of our SDK that makes building on Nosana easier, safer, and more flexible than ever.

Whether you're building a backend service, a frontend dApp, or anything in between, Nosana Kit v2.0 provides a single, production-ready SDK that just works.

---

## Why V2.0?

As the Nosana ecosystem grew, we learned what builders really need:

- **API-first approach** – Create and manage jobs via the Nosana API without managing private keys
- **Functional Architecture** - From class based to factory functions and modern API patterns
- **Universal Wallet Support** - Full support for browser wallets, and keypair based wallets
- **Flexible authentication** – Use API keys for server-side apps, or wallet signatures for client-side
- **Modern Solana tooling** – Built on [`@solana/kit`](https://github.com/anza-xyz/kit) for better type safety and performance
- **Production-ready reliability** – 70%+ test coverage and robust error handling
- **Simple when you need it, powerful when you don't** – Clean APIs for common tasks, with direct on-chain access when needed
- **Comprehensive Documentation** – Comprehensive documentation at [kit.nosana.com](https://kit.nosana.com/)

So we rebuilt the SDK from scratch with a functional architecture, integrated API client, and a dramatically improved developer experience.

---

## Quick Start

Get up and running in minutes:

```bash
npm install @nosana/kit
```

```typescript
import { createNosanaClient } from "@nosana/kit";

// Initialize with sensible defaults
const client = createNosanaClient();

// Or customize as needed
const client = createNosanaClient(NosanaNetwork.MAINNET, {
  solana: {
    rpcEndpoint: "https://your-rpc.com",
    commitment: "confirmed",
  },
  logLevel: LogLevel.INFO,
});

// Start using it
const markets = await client.jobs.markets();
console.log(`Found ${markets.length} markets`);
```

---

## What's New

### Integrated Nosana API Client

One of the big upgrades Nosana has been working on is allowing developers to interact with Nosana via an API interface.
Use our API to create and manage jobs without touching private keys.

**Server-side with API key:**

```typescript
import { createNosanaClient } from "@nosana/kit";

const client = createNosanaClient(NosanaNetwork.MAINNET, {
  api: {
    apiKey: process.env.NOSANA_API_KEY,
  },
});

// Create jobs via the API
const job = await client.api.jobs.create({
  market: "market-address",
  jobDefinition: {
    /* your job config */
  },
});

// Check your credits
const credits = await client.api.credits.get();
```

**Client-side with wallet signatures:**

```typescript
import { createNosanaClient } from "@nosana/kit";
import { useWalletAccountSigner } from "@nosana/solana-vue";

const client = createNosanaClient();
client.wallet = useWalletAccountSigner(account, currentChain);

// API automatically authenticates with wallet signatures
const markets = await client.api.markets.list();
```

For advanced use cases, you can still interact directly with on-chain programs using private keys or browser wallets. The SDK supports both approaches seamlessly.

### Simpler Transaction Handling

For advanced use cases where you need direct on-chain access, we've streamlined transaction handling:

```typescript
// Most common: one method does it all
const signature = await client.solana.buildSignAndSend(instruction);

// Need control? Break it into steps
const tx = await client.solana.buildTransaction(instruction);
const signed = await client.solana.signTransaction(tx);
const signature = await client.solana.sendTransaction(signed);
```

Behind the scenes, v2.0 automatically estimates compute units and injects the right compute budget, so your transactions are less likely to fail.

### Job Management Made Easy

Create jobs via the API, monitor their status, and retrieve results:

```typescript
// Create a job via API (recommended)
const job = await client.api.jobs.create({
  market: "market-address",
  jobDefinition: {
    type: "docker",
    image: "ubuntu:latest",
    command: ["echo", "Hello, Nosana!"],
  },
});

// Monitor jobs in real-time
const [eventStream, stop] = await client.jobs.monitor();

for await (const event of eventStream) {
  if (event.data.state === JobState.COMPLETED) {
    const results = await client.ipfs.retrieve(event.data.ipfsResult);
    console.log("Job completed!", results);
  }
}
```

The monitoring system uses WebSockets with automatic reconnection, so you never miss an update.

### Built On [`@solana/kit`](https://github.com/anza-xyz/kit)

We've migrated from `@solana/web3.js` to the modern `@solana/kit` library. This brings:

- Better TypeScript types that catch errors at compile-time
- Improved performance with more efficient RPC calls
- Smaller bundle sizes for frontend apps

**Note:** To use v2.0, you'll need to upgrade to `@solana/kit` as well. Don't worry – we're supporting the old `@nosana/sdk` for six months to give you time to migrate.

---

## Migrating from V1.X

If you're using the old `@nosana/sdk`, here's what's changed:

### Client Initialization

```typescript
// Before
import { NosanaClient } from "@nosana/sdk";
const client = new NosanaClient(config);

// Now
import { createNosanaClient } from "@nosana/kit";
const client = createNosanaClient();
```

### Transaction Methods

```typescript
// Before
await client.solana.send(instruction);

// Now
await client.solana.buildSignAndSend(instruction);
```

### API Vs on-Chain

```typescript
// Before: Direct on-chain transactions only
const client = new NosanaClient({ wallet: privateKey });
await client.jobs.post({ ... });

// Now: API-first (recommended)
const client = createNosanaClient(NosanaNetwork.MAINNET, {
  api: { apiKey: process.env.NOSANA_API_KEY }
});
await client.api.jobs.create({ ... });

// Still supports on-chain access when needed
client.wallet = generateKeyPairSigner();
await client.jobs.post({ ... });
```

### Dependencies

```bash
npm uninstall @solana/web3.js
npm install @solana/kit @nosana/kit
```

### Migration Timeline

We're committed to supporting the old SDK while you migrate:

- **`@nosana/sdk` (V1.x)**: Supported for **6 months**

  - Security patches: ✅
  - Bug fixes: ✅
  - New features: ❌
  - Best for: Existing projects using `@solana/web3.js`

- **@nosana/kit (v2.0)**: Full support going forward
  - Recommended for: All new projects
  - Required for: Projects using `@solana/kit`

---

## Real-World Example

Here's a complete example showing how to submit jobs via the API and monitor them:

```typescript
import { createNosanaClient, JobState } from "@nosana/kit";

// Setup with API key
const client = createNosanaClient(NosanaNetwork.MAINNET, {
  api: {
    apiKey: process.env.NOSANA_API_KEY,
  },
});

// Submit a job via API
async function submitJob(jobDefinition) {
  const job = await client.api.jobs.create({
    market: "market-address",
    jobDefinition,
  });

  return job.id;
}

// Monitor for completion
async function watchJobs() {
  const [events, stop] = await client.jobs.monitor();

  for await (const event of events) {
    if (event.data.state === JobState.COMPLETED) {
      const results = await client.ipfs.retrieve(event.data.ipfsResult);
      console.log("Job done!", results);
    }
  }
}
```

That's it. Submit jobs via API, watch for results, done.

**Need direct on-chain access?** You can still use private keys or browser wallets to interact with Nosana programs directly – just set `client.wallet` and use the on-chain methods like `client.jobs.post()`.

---

## What's Included

Nosana Kit v2.0 gives you everything you need to interact with the Nosana Network:

- **Nosana API Client** – Create and manage jobs, check credits, list markets (API key or wallet-based auth)
- **Real-time Monitoring** – WebSocket-based event streaming for job, market, and run updates
- **IPFS Integration** – Pin job definitions and retrieve results seamlessly
- **On-chain Programs** – Direct access to jobs, staking, and token programs when you need it
- **Token Service** – Check NOS balances, get token holders, transfer tokens
- **Authorization** – Sign messages and HTTP requests for secure communication

All backed by comprehensive tests and clear documentation.

---

## Looking Ahead

v2.0 is just the beginning. We're already working on:

- More granular monitoring with custom event filters
- Batch operations for submitting multiple jobs efficiently
- Advanced transaction features like priority fees and retry logic

We're excited to see what you'll build with Nosana Kit v2.0!

---

## Resources

- **Install:** `npm install @nosana/kit`
- **GitHub:** [nosana-ci/nosana-kit](https://github.com/nosana-ci/nosana-kit)
- **NPM:** [@nosana/kit](https://www.npmjs.com/package/@nosana/kit)
- **Docs:** [kit.nosana.com](https://kit.nosana.com/)

---

## Get Help

Questions? Issues? Want to share what you're building?

- **GitHub Issues:** [Report bugs or request features](https://github.com/nosana-ci/nosana-kit/issues)
- **Discord:** [Join our community](https://nosana.com/discord)
- **Twitter:** [@nosana_ci](https://nosana.com/x)

---

**Happy building!** 🚀

— The Nosana Team

---

Want to access to exclusive builder perks, early challenges, and Nosana credits?
Subscribe to our newsletter and never miss an update.

👉 [ Join the Nosana Builders Newsletter ](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

Be the first to know about:

- 🧠 Upcoming Builders Challenges
- 💸 New reward opportunities
- ⚙ Product updates and feature drops
- 🎁 Early-bird credits and partner perks

Join the Nosana builder community today — and build the future of decentralized AI.
