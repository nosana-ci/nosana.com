---
category: "blog"
title: "Fourth Builders’ Challenge Recap: What Builders Created on Nosana"
description: The fourth Nosana Builders’ Challenge showed what happens when developers are given open infrastructure, real incentives, and the freedom to experiment.
thumbnail: "./assets/thumbnail.jpg"
createdAt: "2026-04-28"
tags:
  - product
  - challenge
---

This edition brought together builders from across the world to create AI agents and autonomous applications powered by Nosana GPU compute and the ElizaOS ecosystem. The result was our biggest challenge yet: over one hundred submissions, thousands of community interactions, and projects that went far beyond simple demos.

From DeFi analysts and productivity copilots to Android device agents and multi-agent swarms, builders used Nosana to turn ambitious ideas into working products.

### By the Numbers

The challenge generated strong momentum across the ecosystem:

- **105 submissions** via Superteam
- Submitter geography (32 distinct countries)
- Nigeria 34
- India 12
- United States 10
- Indonesia 7
- Spain 4
- Kenya 3
-
- **1,100+ community messages**
- **200+ tweets**
- **650 unique visitors to the agent challenge repo**
- **428 Clones**
- **550 stars across agent-challenge, nosanta-kit, nosana-cli, and nosana-programs repositories**
- **Dozens of live product demos, repositories, and production-ready concepts**

More than a hackathon, this became a live showcase of what builders can create when GPU access is open, flexible, and available on demand.

### What Made This Challenge Different

This round was not about landing pages or lightweight prototypes.

Many teams shipped:

- Full-stack applications
- Multi-agent systems
- Live dashboards
- Onchain integrations
- Real job deployments on Nosana
- Automated workflows using Gmail, Calendar, Telegram, Solana, and DeFi APIs
- Extensive test coverage and production-grade architecture

The quality bar rose significantly, and the winning projects reflected that.

### Meet the Top 10 Winners

### 1\. AgentForge

**A meta-agent that deploys other agents to Nosana**  
GitHub: [https://github.com/Andy00L/agent-challenge-4](https://github.com/Andy00L/agent-challenge-4)

AgentForge tackled orchestration itself. Instead of building one agent, the team built an agent that launches and manages other ElizaOS agents on Nosana GPUs.

It reads live GPU market data from Solana, selects underused nodes, tracks claims with mutex logic, runs DAG pipelines across multiple nodes, and automatically stops workloads when complete.

The project also included a custom ReactFlow canvas with live node status monitoring.

**Why it stood out:**  
A sophisticated infrastructure layer that transforms Nosana into programmable agent compute.

---

### 2\. Axiom

**A DeFi security analyst agent**  
GitHub: [https://github.com/marchantdev/agent-challenge](https://github.com/marchantdev/agent-challenge)

Axiom focused on one of the biggest opportunities in crypto: automated risk intelligence.

The agent integrates with DefiLlama, Etherscan, Solana RPC, Ethplorer, Immunefi, CoinGecko, GitHub, and more to analyze projects, surface threats, and provide security insights.

It also used Nosana primitives directly to query onchain nodes and job counts.

**Why it stood out:**  
A real-world use case combining AI, security research, and blockchain data.

---

### 3\. LPCLI

**A full DeFi trading and liquidity command center**  
GitHub: [https://github.com/bucketshop69/lpcli](https://github.com/bucketshop69/lpcli)

LPCLI was one of the most technically complete submissions in the challenge.

It shipped as a monorepo containing:

- CLI tools
- MCP server
- ElizaOS plugin
- DeFi integrations across Meteora, Jupiter, Polymarket, and perpetuals

Its Nosana integration lets users fetch GPU markets, estimate NOS token cost, auto-swap SOL to NOS, and spawn compute jobs directly.

**Why it stood out:**  
Deep utility, strong architecture, and a practical bridge between DeFi and compute.

---

### 4\. PROBE

**A Web3 intelligence swarm**  
GitHub: [https://github.com/jordi-stack/agent-challenge](https://github.com/jordi-stack/agent-challenge)

PROBE introduced a multi-agent intelligence system with specialized personas:

- Scout
- Analyst
- Sentinel
- Synthesizer
- Commander

Each role contributes to a larger intelligence workflow, helping users gather and interpret blockchain information.

The system also monitored its own Nosana deployment status and credits balance through direct API integrations.

**Why it stood out:**  
A strong example of collaborative AI agents operating as a team.

---

### 5\. Pulse

**An autonomous Chief of Staff**  
GitHub: [https://github.com/py-tr/agent-challenge](https://github.com/py-tr/agent-challenge)

Pulse reimagined productivity with an AI assistant designed to manage daily execution.

It included:

- Gmail and Google Calendar integrations
- Morning and evening scheduled jobs
- Focus mode
- Analytics dashboard
- Queue management
- Persistent memory systems

Rather than a chatbot, Pulse acted like an operator for real-life workflows.

**Why it stood out:**  
One of the clearest examples of AI agents solving practical day-to-day problems.

---

### 6\. Nostra

**A constitutional DeFi agent**  
GitHub: [https://github.com/Zolldyk/Nostra](https://github.com/Zolldyk/Nostra)

Nostra explored the intersection of autonomous finance and governance.

It featured:

- 18+ custom actions
- Compliance gate wrappers
- Trust ladder state machine
- Telegram-native UX
- Onchain audit logs through the Solana Memo Program

The project focused on making autonomous financial agents more transparent and accountable.

**Why it stood out:**  
A thoughtful approach to trust, compliance, and agent responsibility.

---

### 7\. Buddies

**A five-agent productivity platform**  
GitHub: [https://github.com/jesterkeri/agent-challenge](https://github.com/jesterkeri/agent-challenge)

Buddies created a workplace simulation powered by multiple specialized agents.

Users interact with roles such as:

- Chief
- Hawk
- Radar
- Bounty Hunter
- Buddy

Each agent had distinct responsibilities and routing logic, all coordinated through a shared interface featuring task boards, activity feeds, and a pixel office UI.

**Why it stood out:**  
A fun but functional example of multi-agent collaboration.

---

### 8\. Misoki

**An AI software engineering assistant**  
GitHub: [https://github.com/Murugarajr/agent-challenge](https://github.com/Murugarajr/agent-challenge)

Misoki targeted developers directly.

The platform combined:

- Next.js frontend
- FastAPI Python analysis backend
- ElizaOS plugin
- Pull request workflows
- Code scanning
- Change previews
- Automated improvements

**Why it stood out:**  
A strong developer productivity use case with real workflow value.

---

### 9\. Synapse

**A research operations agent**  
GitHub: [https://github.com/hassnian/agent-challenge](https://github.com/hassnian/agent-challenge)

Synapse focused on structured knowledge work.

Its research-room system supported planning, approvals, sessions, follow-ups, exports, and collaborative workflows across multiple worker processes.

The submission also included multi-container deployments and a separate live frontend.

**Why it stood out:**  
A compelling vision for AI-powered research teams.

---

### 10\. Miku

**An AI agent for Android devices**  
GitHub: [https://github.com/Lexiie/miku](https://github.com/Lexiie/miku)

Miku was one of the most original submissions in the challenge.

The architecture used an ElizaOS agent running on Nosana to convert natural-language commands into structured JSON. A native Android app then executed those commands through device APIs such as:

- SMS
- WiFi
- Brightness
- Alarms

This effectively turned an Android phone into an agent-controlled environment.

**Why it stood out:**  
A creative blend of cloud agents and mobile automation.

---

## What These Winners Tell Us

Several clear themes emerged from this challenge.

### 1\. Builders Want Real Utility

Many submissions focused on practical outcomes:

- Research
- Productivity
- Security
- Trading
- Workflow automation

This shows that builders are moving beyond novelty and into production-grade use cases.

### 2\. Multi-Agent Systems Are Growing Fast

Instead of one assistant doing everything, builders increasingly designed teams of agents with specialized roles.

That pattern appeared across intelligence, productivity, and operations tools.

## 3\. Open Compute Unlocks Experimentation

Many of these ideas require flexible GPU access, fast deployment, and cost efficiency.

That is exactly what Nosana is built to provide.

## 4\. AI \+ Web3 Is Becoming More Practical

Rather than abstract narratives, builders used blockchain where it adds value:

- Onchain records
- Market pricing
- Wallet actions
- DeFi execution
- Ownership primitives
- Transparent infrastructure

---

# **Thank You to Every Builder**

While ten winners were selected, every submission contributed to the momentum of the challenge.

The quality, creativity, and technical ambition across all 105 entries show that the future of autonomous software is being built right now.

And it is being built in public.

**What’s Next**

This challenge was another step toward a larger vision:

A world where anyone can launch AI products without asking permission from centralized cloud gatekeepers.

To every builder who joined: thank you.  
To everyone watching: this is only the beginning.

**Start building on Nosana today.**

## Useful Links

- [Nosana Website](https://nosana.com/)
- [Join the Discord](https://nosana.com/discord)
- [Follow us on X](https://nosana.com/twitter/)
- [Nosana on GitHub](https://nosana.com/github/)
- [Nosana Grants Program Page](https://nosana.com/grants)
