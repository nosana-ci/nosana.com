---
title: "Agent 102 Recap: MCP, Mastra, and the Next Wave of AI Builders"
description: Agent 102 our third Builders’ Challenge, pushed the bar higher and our builders cleared it with style.
img: /img/NosanaBuildersChallengeWrapped102.jpg
createdAt: "2025-12-04"
tags:
  - product
---

The third edition of the [Nosana Builders Challenge](https://earn.superteam.fun/listing/nosana-builders-challenge-agents-102) is a wrap, and what a ride it's been. This time, we challenged devs to go deeper: building AI agents with the [Mastra framework](https://mastra.ai/), integrating MCP servers, and deploying on Nosana's decentralized GPU network.

The result? 53 submissions from builders in 10+ across the globe, tackling everything from blockchain analytics to AI-powered music generation. From production-ready systems with 88% test coverage to agents with three distinct chess-playing personalities—our community proved that innovation on decentralized compute is just getting started.

## Meet the Winners: What They Built

### 1st Place: Chess AI with 3 Personalities — [Mike Cyon](https://github.com/alcyonect-coder/agent-challenge)

**What it does:** A multi-agent chess tournament system featuring three distinct AI personalities—Strategic, Aggressive, and Defensive—each with unique playing styles powered by 670 lines of strategic chess knowledge.

**Why it stood out:** Perfect multi-agent orchestration using Mastra, flawless two-container Nosana deployment with GPU compute, and exceptional creativity in agent design. Mike didn't just build a chess AI—he built a personality system.

---

### 2nd Place: AI Lo-Fi Beats Generator — [Nishant Banakar](https://github.com/Nish-077/agent-challenge)

**What it does:** An AI music producer that generates lo-fi beats with 5 moods, 10 rhythm patterns, and 5 bass styles. Features a two-mode system (Producer/Composer) with real-time SSE updates.

**Why it stood out:** 381 lines of music generation logic, 13 Mastra tools, and sophisticated musical intelligence. Nishant showed that AI agents can be creative collaborators, not just task executors.

---

### 3rd Place: Tedix — AI Brand Intelligence Agent — [Aaron Koivunen](https://github.com/koikar/)

**What it does:** A website-to-MCP transformation pipeline that creates universal AI assistants from any brand's web presence. Full-stack architecture with [Cloudflare Workers](https://workers.cloudflare.com/), [Supabase](https://supabase.com/), [Firecrawl](https://www.firecrawl.dev/), and [AutoRAG](https://github.com/Marker-Inc-Korea/AutoRAG).

**Why it stood out:** 2,721+ lines across 3 applications. The most sophisticated multi-service architecture in the competition. Production-ready infrastructure that could power real businesses today.

---

### 4th Place: MagicCV — AI-Powered CV Generator — [Ho Tat Bao Hoang](https://github.com/blu1606/MagiCV)

**What it does:** An intelligent CV generator using 768-dimensional vector embeddings to match job requirements with candidate skills. Includes semantic search via [pgvector](https://github.com/pgvector/pgvector).

**Why it stood out:** The only submission with comprehensive testing—44 tests passing with 88% coverage. This is what production-ready looks like.

---

### 5th Place: nosDraw — AI Diagram Generator — [Andy Zoro](https://github.com/Andy00L/agent-challenge)

**What it does:** Natural language to draw.io diagrams. Describe what you want, and the agent generates proper XML with 50+ supported shapes.

**Why it stood out:** 217-line agent with comprehensive XML instructions. Andy turned a simple concept into an exceptionally well-crafted tool with a complete shape library.

---

## Trends We're Seeing

The submissions this round revealed some exciting patterns in how builders are approaching AI agents:

**MCP is Catching On.** Eight submissions implemented MCP servers, with Aaron Koivunen's Tedix showing the most sophisticated integration—transforming any website into an MCP-compatible AI resource.

**Multi-Agent Architectures.** Top builders aren't creating single agents anymore. Mike cyon's chess system and Biello Nuhu's SentinelOps both feature multiple specialized agents working together, each with distinct responsibilities.

**Blockchain Meets AI.** Four submissions tackled crypto and DeFi use cases—from rug pull detection to market sentiment analysis. Prapti Sharma's Blockchain Intelligence Agent included six specialized tools for everything from token prices to NFT collection analytics.

**Testing Matters (But Most Skip It).** Ho Tat Bao Hoang was the only participant with comprehensive test coverage. This is both a gap and an opportunity—as AI agents move into production, testing infrastructure will become critical.

**GPU-First Development.** The strongest submissions used Ollama on Nosana GPU rather than relying on external APIs. Mike cyon's two-container setup (app + ollama with S3 model cache) is now the gold standard.

## Global Builder Energy

This challenge drew builders from across the globe:

- **Nigeria** — Largest representation with builders tackling everything from DevOps agents to crypto analytics
- **India** — Strong showing with production-quality submissions
- **Vietnam, Germany, Canada, Kenya** — Diverse perspectives bringing unique use cases
- **United Kingdom, Greece, Brazil, Turkey** — Growing international community

The [Discord](https://nosana.com/discord) stayed active throughout, with builders sharing progress, debugging deployment issues, and demoing their work. The spirit of open collaboration—developers helping developers—is what makes this community special.

## What Made Winners Stand Out

Looking at the top submissions, a clear pattern emerges:

1. **Deep Technical Implementation** — Not just connecting APIs, but building real logic. The top 5 averaged 1,000+ lines of custom code.

2. **Proper Framework Usage** — Mastra's `new Agent()` + `createTool()` pattern, used correctly. No shortcuts, no workarounds.

3. **Complete Deliverables** — Video demos, tweets, Docker images, Nosana deployments. The whole package.

4. **Professional Documentation** — READMEs that explain architecture, not just setup steps.

5. **Real Innovation** — Solving interesting problems in creative ways, not just following tutorials.

## Special Recognition

**🏆 Technical Excellence Award** — Ho Tat Bao Hoang (MagicCV)
*The only submission with comprehensive testing infrastructure.*

**🏆 Most Sophisticated Architecture** — Aaron Koivunen (Tedix)
*Three applications, MCP server, Cloudflare Workers, Supabase, AutoRAG—production-ready infrastructure.*

**🏆 Best Agent Instructions** — Andy Zoro (nosDraw)
*217 lines of carefully crafted agent prompts with complete XML reference.*

**🏆 Most Creative Concept** — Mike Cyon (Chess AI)
*Three distinct AI personalities battling it out on the chessboard.*

## Thank you!

Huge thanks to our partners at [Mastra framework](https://mastra.ai/) and [Superteam](https://superteam.fun) for continuing to support builders across the ecosystem. And to every participant who submitted—whether you placed in the top 10 or learned something new along the way—you're building the future of decentralized AI infrastructure.

## Ready for Challenge 4?

Follow [@nosana on X](https://nosana.com/x), jump into the [Discord](https://nosana.com/discord), and star us on [GitHub](https://nosana.com/github) to be the first to know when the next challenge drops.

The foundations of tomorrow's AI infrastructure are being laid today. Those who build now lead later.

---

### Explore All Winners

Check out the full list of winners on the official [Superteam listing page](https://earn.superteam.fun/listing/agent-challenge-102).

| Rank | Builder | Project |
|------|---------|---------|
| 1 | Mike Cyon | [Chess AI (3 Personalities)](https://github.com/alcyonect-coder/agent-challenge) |
| 2 | Nishant Banakar | [AI Lo-Fi Beats Generator](https://github.com/Nish-077/agent-challenge) |
| 3 | Aaron Koivunen | [Tedix (Brand Intelligence)](https://github.com/koikar/) |
| 4 | Ho Tat Bao Hoang | [MagicCV](https://github.com/blu1606/MagiCV) |
| 5 | Andy Zoro | [nosDraw](https://github.com/Andy00L/agent-challenge) |
| 6 | Zigsai AI | [Crypto Analysis Agent](https://github.com/ZKSystemId/agent-challenge) |
| 7 | Vijay Kv | [HireMind](https://github.com/Vijaykv5/agent-challenge) |
| 8 | Lexiie Casanova | [AI Assistant](https://github.com/Lexiie/agent-challenge) |
| 9 | Ibrahim Abdulkarim | [Agent Framework](https://github.com/aliveevie/agent-challenge) |
| 10 | Bold Panther | [Nosana Chat MCP](https://github.com/HoomanBuilds/nosana-chat-mcp) |

## Challenge 4 Is Coming. Are You In?

Follow [ @nosana on X ](https://nosana.com/x), jump into the [ Discord ](https://nosana.com/discord) and star us on [ GitHub ](https://nosana.com/github) to be the first to know when the next challenge drops.

> The foundations of tomorrow’s AI infrastructure are being laid today. Those who build now lead later.

---

Want to access to exclusive builder perks, early challenges, and Nosana credits?\
Subscribe to our newsletter and never miss an update.

👉 [ Join the Nosana Builders Newsletter ](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

Be the first to know about:

- 🧠 Upcoming Builders Challenges
- 💸 New reward opportunities
- ⚙ Product updates and feature drops
- 🎁 Early-bird credits and partner perks

Join the Nosana builder community today — and build the future of decentralized AI.

