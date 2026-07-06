---
category: "blog"
title: "From Solana DePIN to Developer-Ready GPU Cloud: The Nosana Journey"
description: ""
thumbnail: "./assets/NosanaBlogSolanaDePin.jpg"
createdAt: "2026-07-06"
tags:
  - "product"
---

The rapid expansion of artificial intelligence has turned access to GPU computing into one of the most important infrastructure challenges facing developers. AI teams are no longer using GPUs only to train experimental models. They need reliable compute for large language model inference, autonomous agents, image and video generation, speech recognition, rendering, simulations, fine-tuning, data processing, and applications that must remain available long after the initial prototype is complete.

Traditional cloud platforms can provide that capacity, but developers often face high prices, limited access to specific GPU models, complicated billing, and infrastructure commitments that are difficult to justify when demand changes from one week to the next. A startup may require significant GPU power during development or a product launch, then far less during normal operation. An AI agent may remain relatively quiet for hours before triggering an intensive workflow. A creative application may need large amounts of compute for a short production cycle rather than a permanent reservation.

Nosana was built around the belief that developers should have another option. Instead of depending entirely on infrastructure owned by a small group of centralized providers, they could rent GPUs from a distributed global network and pay for the computing capacity they actually use. GPU owners, meanwhile, could contribute available hardware and earn by running real workloads.

What began as a Solana-based decentralized compute network has grown into an open-source GPU cloud for AI and high-performance workloads. Nosana now positions its platform around on-demand GPU rental, flexible pricing, global access to NVIDIA hardware, and support for workloads ranging from inference and model serving to agents, rendering, simulations, training, and fine-tuning.

The shift was not simply a branding exercise. Nosana had to transform a decentralized protocol into infrastructure that developers could use as a practical alternative to conventional cloud GPU providers. That required years of work across hardware verification, workload scheduling, host reliability, container execution, pricing, deployment management, developer tooling, and the user experience surrounding the network. The earlier draft captured the main stages of this evolution, but the stronger story is not only that Nosana moved from DePIN to decentralized cloud infrastructure, it is that the company is turning globally distributed hardware into a GPU platform designed for real AI products\!

## **Nosana Started by Rethinking How Software Infrastructure Could Be Supplied**

Nosana was originally created as a decentralized network for continuous integration and continuous delivery, commonly shortened to CI/CD. These systems automate important parts of software development by building code, testing changes, and preparing or deploying new versions of an application.

The initial idea was that these development tasks did not always need to run on infrastructure controlled by a conventional cloud provider. Independent operators could contribute computing resources, developers could access those resources through the network, and blockchain infrastructure could coordinate payments and incentives between participants.

Although the early product was focused on software automation rather than AI, the architecture already contained the foundations of a distributed GPU marketplace. Nosana was building a system capable of matching demand for compute with independently supplied hardware, executing jobs remotely, and coordinating an open network whose participants did not need to belong to the same company.

Solana played an important role in that model, but it was never intended to perform the actual computation. AI models and other GPU-intensive applications require physical processors, memory, storage, networking, and container environments. Those workloads run on machines connected to Nosana, while Solana supports parts of the economic and coordination layer surrounding the marketplace.

This separation allows the network to combine real-world computing hardware with blockchain-based settlement and incentives. The GPUs perform the work, while the network coordinates access to them.

## **Why AI Became the Stronger Use Case**

By 2023, the demand for GPU infrastructure had changed dramatically. Open-source AI models were becoming more capable, generative AI had entered mainstream product development, and developers needed accelerated computing for far more than large training runs.

Inference became especially important because every interaction with a deployed AI model requires compute. A language model answering users, a transcription system processing audio, an image generator producing visual content, or an autonomous agent completing a multi-step task may require repeated GPU access throughout the lifetime of the product.

Nosana had already developed a distributed compute foundation, but conventional CI/CD jobs did not always require the specialized hardware that could make the network particularly valuable. AI workloads created a clearer connection between underused GPUs and an expanding market of developers searching for affordable, flexible capacity.

Nosana therefore shifted its focus toward AI inference and GPU computing. The original mission of making compute more open remained intact, but the network began concentrating on workloads where access to suitable hardware was becoming a genuine barrier to product development.

That decision placed Nosana at the intersection of two important technology categories: AI infrastructure and decentralized physical infrastructure networks, or DePIN. In this model, the physical resource is GPU capacity, while the product developers interact with is an on-demand cloud computing platform.

## **Building a GPU Network Is Easier Than Building a Reliable GPU Cloud**

A marketplace can show that GPUs are available, but developers need much more than a list of machines. They need confidence that the advertised hardware exists, performs as expected, can run the required software, and will remain available long enough to complete the workload. Traditional cloud providers solve these problems through centralized ownership and control. They manage the data centres, hardware configurations, networking standards, maintenance procedures, and operating environments. A distributed GPU cloud must create a dependable service across machines operated by many different providers.

Nosana approached this challenge through a phased Test Grid programme. During the first public phase, more than one hundred GPU nodes connected to the network and processed AI inference jobs, benchmarks, and stress tests over six weeks. Many of those workloads involved Stable Diffusion image generation and Whisper speech recognition, giving the team practical information about onboarding, workload assignment, hardware behaviour, and network performance.

Later phases expanded the network and introduced stronger production requirements ahead of mainnet. Nosana tested market structures, host staking, hardware verification, anti-spoofing protections, benchmarking, pricing, and job-to-node matching. The third Test Grid phase was presented as the final stage before the public Main Grid launch scheduled for January 14, 2025\.

This testing process addressed the central challenge of decentralized GPU computing: making independently operated hardware behave like infrastructure that developers can actually depend on.

## **Mainnet Turned the Network Into a Public GPU Marketplace**

Nosana opened its GPU marketplace to the public on January 14, 2025\. The launch moved the project from controlled testing into a production environment where customers could run workloads and GPU providers could earn by supplying computing power.

Reaching mainnet proved that the technical and economic network could operate publicly, but it also changed the standard against which Nosana would be evaluated. Once developers begin paying for GPU compute, they compare the experience not only with other DePIN networks but with established cloud platforms.

A functioning protocol is therefore only the foundation. Developers also expect understandable pricing, straightforward deployment, usable logs, workload visibility, documentation, support for familiar frameworks, and a clear path from testing an idea to operating a real application.

Nosana’s development after mainnet increasingly focused on closing that gap. The objective was no longer simply to demonstrate that decentralized GPUs could run jobs. It was to make renting and using those GPUs feel like a coherent cloud product.

## **How Developers Run AI Workloads on Nosana**

Nosana uses containerized job definitions to describe what should run on the network. A developer can define the container image, commands, resources, environment variables, volumes, ports, and other execution requirements, after which the network matches the workload with an appropriate GPU host.

This approach allows teams to bring the tools and environments they already use instead of rebuilding their applications around a proprietary platform. Developers can package a service in Docker, specify the workload requirements, and run it through Nosana’s infrastructure.

Nosana’s documentation includes examples for several widely used AI tools. Developers can create OpenAI-compatible API endpoints with vLLM or LMDeploy, launch Ollama-based inference services, run Stable Diffusion for image generation, and use Whisper for speech transcription. The job specification can also coordinate multiple operations across separate containers, allowing one part of a workflow to pass results into another processing stage. Support for existing frameworks matters because most developers searching for cloud GPUs are not looking for an entirely new software ecosystem. They want to rent GPU capacity for the models, containers, APIs, and pipelines they already understand.

The infrastructure becomes more attractive when a team can move an existing workload onto Nosana without redesigning the entire application.

## **From a Command-Line Tool to a Complete GPU Deployment Experience**

Early infrastructure products often begin with a command-line interface because it gives technical users direct control and allows the platform to expose new capabilities quickly. Nosana’s CLI remains useful for posting jobs, inspecting markets, selecting resources, and automating deployment workflows.

However, a broader developer audience also needs a visual product that makes GPU rental, workload deployment, and monitoring easier to understand. Nosana has expanded its interface around clearer experiences for developers, GPU hosts, and users exploring the network.

The current Nosana platform emphasizes on-demand access, transparent pricing, a streamlined dashboard, and the ability to start workloads without long-term commitments. Developers can compare available NVIDIA GPU markets, review pricing and availability, and scale compute according to the needs of the application.

Nosana has also introduced dedicated deployment, hosting, and network-exploration experiences. The Deploy interface is intended to reduce the setup required to launch GPU workloads, while the Host environment gives providers visibility into performance, earnings, uptime, and workload activity. The Explorer provides a public view into completed and running workloads and the total compute delivered by the network.

These improvements represent a major step in Nosana’s evolution. The network is not abandoning its decentralized architecture; it is placing that architecture beneath a product experience designed around the tasks developers actually want to complete.

## **What Developers Can Build With On-Demand GPU Compute**

Nosana supports workloads across AI and high-performance computing rather than limiting the network to one model type or application category. The platform presents use cases including model inference, model serving, autonomous agents, rendering, simulations, gaming, machine learning, training, and fine-tuning.

For teams working with open-source AI, flexible access to cloud GPUs can provide greater control over the model and deployment environment. Instead of sending every request to a proprietary API, developers can host compatible models, configure the surrounding software stack, and control how data moves through the application.

This is particularly valuable for products that combine several components. A production AI system may include a language model, an embedding service, a retrieval layer, a database, monitoring tools, APIs, and a user interface. Some parts may require persistent endpoints, while others need compute only during periods of higher demand.

Nosana’s case studies already include applications across AI security, workshops, production inference, decentralized image generation, and compute routing. Alio uses Nosana for large-scale LLM risk detection and red-teaming simulations, while Sogni AI uses the network for image-generation workloads and reports infrastructure cost reductions of up to 60%. Inferia uses Nosana for production-grade inference, and AI Builders uses the network to give workshop participants live access to models and workloads.

These examples show why the more relevant question is no longer whether decentralized GPUs can execute a job. The real question is how many useful products can be built and operated on top of them.

## **AI Agents Are Increasing the Need for Flexible GPU Infrastructure**

The growth of AI agents makes flexible GPU access even more important because agentic systems rarely behave like simple, predictable applications. An agent may collect information, call tools, communicate with several services, invoke multiple models, evaluate intermediate results, and continue working without waiting for a user to initiate every individual action.

The infrastructure behind that workflow may remain idle during one period and experience heavy demand during another. Some services must remain available continuously, while others are needed only when a particular task is triggered. A team operating such a product benefits from the ability to scale GPU capacity without committing permanently to the highest possible level of usage.

Nosana has increasingly used builder programmes to explore this category. Its challenges have asked developers to create and deploy AI agents using frameworks such as ElizaOS and Mastra, with complete application stacks running on the decentralized GPU network rather than a traditional cloud provider.

These projects also help Nosana improve the platform. Agent developers quickly reveal where better endpoint management, deployment tooling, networking, monitoring, and persistent services are required. Every real application provides information that cannot be learned from benchmarks alone.

## **Solana Coordinates the Marketplace While GPUs Execute the Work**

As Nosana becomes easier to use, the blockchain layer may become less visible to developers, but it remains important to the structure of the marketplace.

Solana supports transactions and economic interactions between compute users and independent hardware providers. Nosana has used the network for job posting, payments, staking, rewards, and other coordination mechanisms. Its technical documentation has historically required users posting jobs directly through the CLI to interact with a Solana wallet and the relevant network assets.

The computational work remains off-chain because GPU applications require hardware capabilities that blockchains are not designed to provide. Solana coordinates parts of the marketplace, while physical GPUs run the models, render the images, process the audio, or complete the simulation.

This architecture allows Nosana to preserve the openness of a distributed marketplace without pretending that blockchains can replace the hardware required for modern AI.

## **Build and Scale AI Workloads on Nosana**

Developers can use Nosana to rent NVIDIA GPUs, deploy containerized applications, serve open-source models, create inference APIs, run AI agents, generate media, and process high-performance workloads through a globally distributed compute network.

Explore the available GPUs and launch a workload at **nosana.com**.

## Useful Links

- [Nosana Website](https://nosana.com/)
- [Join the Discord](https://nosana.com/discord)
- [Follow us on X](https://nosana.com/twitter/)
- [Nosana on GitHub](https://nosana.com/github/)
- [Nosana Grants Program Page](https://nosana.com/grants)
