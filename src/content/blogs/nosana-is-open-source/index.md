---
category: "blog"
title: "Open Source and Verified On Chain: A New Transparency Milestone for Nosana"
description: "All Nosana Solana programs are now open source and carry a Verified Build badge on Solana Explorer, confirming that the published source code matches the programs deployed on chain."
thumbnail: "./assets/Nosana-opensource-blog.webp"
createdAt: "2026-07-24"
tags:
  - "news"
---

Transparency is fundamental to decentralized infrastructure. Developers and users should be able to understand how a network operates, inspect the systems they interact with, and independently confirm that the deployed technology matches the code made available to the public.

With that principle in mind, we have reached an important milestone for Nosana.

All Nosana Solana programs are now open source, and each of them carries a Verified Build badge on Solana Explorer.

This means that the source code behind Nosana’s on chain programs is publicly accessible, while the Verified Build process confirms that the published code matches the programs currently deployed on Solana.

The code can be inspected, the builds can be reproduced, and the results can be verified independently.

## Opening Nosana’s On Chain Infrastructure

Nosana’s Solana programs support some of the most important parts of the network, including staking, rewards, compute jobs, and network pools.

These programs manage interactions involving staked NOS, reward distribution, compute job activity, and participation across the wider Nosana ecosystem. Because they play such an important role, we believe developers and users should have direct visibility into how they operate.

All four programs are now open source and verified through Solana Verified Builds:

[Nosana Staking](https://explorer.solana.com/address/nosJhNRqr2bc9g1nfGDcXXTXvYUmxD4cVwy2pMWhrYM/verified-build)

[Nosana Rewards](https://explorer.solana.com/address/nosRB8DUV67oLNrL45bo2pFLrmsWPiewe2Lk2DRNYCp/verified-build)

[Nosana Jobs](https://explorer.solana.com/address/nosPdZrfDzND1LAR28FLMDEATUPK53K8xbRBXAirevD/verified-build)

[Nosana Pools](https://explorer.solana.com/address/nosScmHY2uR24Zh751PmGj9ww9QRNHewh9H59AfrTJE/verified-build)

Together, these programs form the foundation of Nosana’s on chain infrastructure. Making them publicly available gives developers, researchers, and community members a clearer view of the systems supporting the network.

## Why Open Source Matters for a GPU Cloud

Nosana is building a decentralized GPU compute cloud that connects developers requiring compute with providers contributing GPU resources. A marketplace like this coordinates more than infrastructure. It brings together two sides with different needs. 

Developers need reliable access to compute, clear job execution processes, and confidence in how payments and network interactions are handled. GPU providers need transparency around participation, rewards, pools, and the systems through which compute demand reaches their hardware.

The on chain programs supporting these interactions should therefore be open to inspection. When marketplace rules are only described through documentation, users still depend on the operator’s explanation of how the system works. Open source code gives developers and providers the ability to look beyond those explanations and examine the underlying logic directly.

For developers purchasing compute, this creates greater visibility into the infrastructure supporting job activity and payments. They can understand the systems their applications depend on before deploying workloads or building deeper integrations with Nosana.

For GPU providers, open source programs offer a clearer view of the mechanisms supporting network participation. Providers contributing valuable hardware resources should be able to inspect the systems connected to pools, rewards, and job activity rather than participating through an entirely closed marketplace.

This is especially important in decentralized compute, where the network is intended to reduce dependence on a single cloud operator. Replacing a centralized infrastructure provider with an opaque decentralized platform would not deliver the level of openness that developers and providers should expect.

Open source helps ensure that decentralization applies not only to where compute comes from, but also to how the marketplace is coordinated.

## Why Publishing the Code Is Not Enough

Making source code public is an important step, but open source alone does not prove that the published code is the same code running on chain.

Solana programs are deployed as compiled bytecode. While developers can inspect the human readable source code in a public repository, they still need a reliable way to confirm that it corresponds to the deployed program.

Without this additional verification, there can still be a gap between the code presented publicly and the program operating on the network.

Solana Verified Builds close that gap.

## How Verified Builds Work

The Verified Build process rebuilds the publicly available source code in a standardized and reproducible environment.

Using the required compiler, dependencies, and configuration, the process generates a program binary. That result is then compared byte for byte with the program currently deployed on Solana. When the two match, it confirms that the published source code corresponds to the deployed program.

This gives developers and users a direct way to verify that the code they are reviewing is the same code they are interacting with on chain.

The Verified Build badge displayed on Solana Explorer makes the result easy to check. However, the process does not depend solely on the badge. Anyone can independently reproduce the build and compare the result with the deployed program.

Verification therefore becomes something that can be checked directly rather than accepted on trust.

## What This Means for the Nosana Community

For users staking NOS, receiving rewards, running compute jobs, or participating in pools, this update provides greater visibility into the programs supporting those activities.

Anyone can review the public source code, open the relevant program on Solana Explorer, and confirm its Verified Build status.

Developers and security researchers can go further by reproducing the build process themselves and comparing the resulting binary with the program deployed on Solana.

This makes Nosana’s on chain infrastructure easier to inspect, understand, and build around.

It also gives developers a clearer technical foundation for creating integrations, applications, and new experiences within the Nosana ecosystem.

## Building With Greater Transparency

Open sourcing and verifying every Nosana Solana program is an important step in building infrastructure that can be independently inspected.

As Nosana continues to expand its decentralized GPU compute network, transparency will remain an important part of how we develop the on chain systems supporting it.

The source code is publicly available, every program is verified, and the results can be checked directly through Solana Explorer.

**Open source. Verifiable. On chain. 🚀**

## Useful Links

* [Nosana Website](https://nosana.com/)  
* [Join the Discord](https://nosana.com/discord)  
* [Follow us on X](https://nosana.com/twitter/)  
* [Nosana on GitHub](https://nosana.com/github/)  
* [Nosana Grants Program](https://nosana.com/grants)
