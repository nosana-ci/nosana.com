---
title: "Elevating the Deployment Experience: Introducing Nosana's New Deployment Manager"
description: "This is the first article in our technical series exploring how we're revolutionizing deployments on the Nosana network."
img: /img/NosanaDeploymentManagerBlog.jpg
createdAt: "2025-10-16"
tags:
  - product
---

_This is the first article in our technical series exploring how we're revolutionizing deployments on the Nosana network. Over the coming weeks, we'll dive deep into the features, architecture, and innovations that make distributed computing more accessible than ever._

## The Challenge of Distributed Deployments

Deploying applications to distributed computing networks has traditionally been complex. Developers need to manage replicas, handle failures, monitor resources, and ensure their applications run reliably across a decentralized infrastructure. We've been listening to your feedback, and we're excited to introduce a game-changing solution: the Nosana Deployment Manager.

Our new deployment service isn't just an incremental improvement—it's a complete reimagining of how deployments should work on distributed networks. We've focused on three core principles: **accessibility**, **feature richness**, and **rock-solid stability**.

## What Makes Our Deployment Manager Different?

The Nosana Deployment Manager transforms containerized applications into distributed deployments with just a few lines of code. But what really sets it apart is the thoughtful abstraction layer we've built on top of the complex distributed computing primitives.

Here's what you get out of the box:

### 🚀 **Simple, Intuitive API**

Gone are the days of wrestling with complex configuration files. Our deployment manager provides a clean, TypeScript-first API that feels natural to use:

```typescript
import { Client } from "@nosana/sdk";

const client = new Client("mainnet", wallet);

// That's it! You're ready to deploy
const deployment = await client.deployments.create({
  name: "My Application",
  market: "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
  replicas: 3,
  timeout: 300,
  strategy: "SIMPLE",
  ipfs_definition_hash: ipfsHash,
});
```

### 🎯 **Multiple Deployment Strategies**

Not all workloads are created equal. That's why we've implemented multiple deployment strategies to match your specific needs:

- **SIMPLE**: Perfect for one-off batch jobs
- **SIMPLE-EXTEND**: When you need flexibility to scale after deployment
- **SCHEDULED**: For recurring tasks and cron-like workloads
- **INFINITE** (coming soon): For always-on services that self-heal

### 💰 **Built-in Vault Management**

Managing funds for distributed computing has never been easier. Each deployment includes its own vault with straightforward methods for funding and withdrawals:

```typescript
// Top up your deployment vault
await deployment.vault.topup({ SOL: 1, NOS: 10 });

// Check balance anytime
const balance = await deployment.vault.getBalance();

// Withdraw unused funds when done
await deployment.vault.withdraw();
```

## The Power of Functional Composition

One of our favorite features is the `pipe` function, which brings functional programming elegance to deployment management. Chain multiple operations together in a clean, readable flow. So the example above can be composed into a single, elegant pipeline:

```typescript
const deployment = await client.deployments.pipe(
  deploymentConfig,
  async (d) => await d.vault.topup({ SOL: 0.1, NOS: 5 }),
  async (d) => await d.start(),
  async (d) => await d.updateReplicas(5)
);

console.log(`Deployment ${deployment.state.id} is running!`);
```

This pattern makes complex deployment workflows feel natural and keeps your code clean and testable.

## Real-World Reliability

We've built comprehensive state management into the deployment lifecycle. Your deployments move through clear, well-defined states:

- **DRAFT** → **STARTING** → **RUNNING** → **STOPPING** → **STOPPED** → **ACHIEVED**

Each state transition is atomic and predictable. Plus, we've added intelligent error handling for common scenarios like insufficient funds, giving you clear feedback when something needs attention. Once the job has reached the `ACHIEVED` state, no further changes can be made, ensuring the integrity of completed deployments.

## Monitoring and Observability

Understanding what's happening with your deployments is crucial. That's why we've built comprehensive monitoring right into the SDK:

```typescript
// Get all your deployments
const deployments = await client.deployments.list();

// Check specific deployment status
const deployment = await client.deployments.get("<deployment-id>");

// Monitor active tasks
const tasks = await deployment.getTasks();
```

## Getting Started Today

Ready to try it out? Here's a complete example to get you started:

```typescript
import { Client } from "@nosana/sdk";

const wallet = process.env.NOSANA_PRIVATE_KEY;

async function deployMyApp() {
  // Initialize client
  const client = new Client("mainnet", wallet);

  // Define your job
  const jobDefinition = {
    version: "0.1",
    type: "container",
    global: {
      variables: {
        MODEL: "gpt-oss:20b",
      },
    },
    ops: [
      {
        id: "gpt-oss:20b",
        type: "container/run",
        args: {
          gpu: true,
          image: "docker.io/ollama/ollama:0.12.0",
          expose: [
            {
              port: 11434,
              health_checks: [
                {
                  type: "http",
                  path: "/api/tags",
                  method: "GET",
                  expected_status: 200,
                  continuous: false,
                },
              ],
            },
          ],
          resources: [
            {
              type: "Ollama",
              model: "%%global.variables.MODEL%%",
            },
          ],
        },
      },
    ],
    meta: {
      system_requirements: {
        required_vram: 16,
      },
    },
  };

  // Pin to IPFS
  const ipfsHash = await client.jobs.pinJobDefinition(jobDefinition);

  // Deploy with confidence
  const deployment = await client.deployments.create({
    name: "Ollama GPT-OSS Deployment",
    // NVIDIA-3090 https://dashboard.nosana.com/markets/CA5pMpqkYFKtme7K31pNB1s62X2SdhEv1nN9RdxKCpuQ
    market: "CA5pMpqkYFKtme7K31pNB1s62X2SdhEv1nN9RdxKCpuQ",
    replicas: 2, // Number of instances to run
    timeout: 600, // In seconds
    strategy: "SIMPLE-EXTEND",
    ipfs_definition_hash: ipfsHash,
  });

  // Fund and start
  await deployment.start();

  console.log("🎉 Deployment live:", deployment.state.id);
}
```

## What's Next?

This is just the beginning. In the coming weeks, we'll be diving deeper into:

- **Part 2**: Dashboard UI updates, real-time monitoring, and managing deployments visually
- **Part 3**: Advanced deployment strategies, building self-healing, infinitely-running services

We're also working on exciting features like:

- Auto-scaling based on workload
- Advanced scheduling with cron expressions
- Multi-region deployment strategies
- Enhanced monitoring and alerting

## Join the Revolution

The Nosana Deployment Manager represents a fundamental shift in how we think about distributed computing. We're not just making deployments easier—we're making them accessible to every developer, regardless of their blockchain or distributed systems experience.

**Ready to get started?**

- 📦 Install the SDK: `npm install @nosana/sdk`
- 📖 Read the [Deployment Manager Docs](https://github.com/nosana-ci/nosana-sdk/tree/main/src/services/deployments)
- 🦢 Check out the [Swagger Docs](https://deployment-manager.k8s.prd.nos.ci/documentation/swagger#/)
- 💻 Explore the [code on GitHub](https://github.com/nosana-ci/nosana-sdk/tree/main/src/services/deployments)
- 📚 Check out the [Nosana documentation](https://docs.nosana.io)

Have feedback or questions? We'd love to hear from you! Drop us a line in Discord or open an issue on GitHub. Together, we're building the future of distributed computing—one deployment at a time.

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

---

## Useful Links

- [Join the Discord](https://nosana.com/discord)
- [Follow us on X](https://nosana.com/x)
- [Nosana on GitHub](https://nosana.com/github)
