---
category: "blog"
title: "BreakPoint 2023: Bridging the Global GPU Shortage"
description: "We're building the world's largest decentralized compute grid by directly connecting GPUs and AI users"
thumbnail: "./assets/breakpointbanner.png"
createdAt: "2023-11-09"
tags:
  - "events"
---

Breakpoint is behind us, and what a time we had. This was an incredible event, with all the fantastic people from the Solana ecosystem on one campus. A big shout-out to the Solana team for organizing such an excellent conference in the rough Dutch autumn weather. We were very excited that both of our founders were invited to speak at the event. Jesse was able to give a workshop on our tooling in front of a packed audience, and Sjoerd was invited onto the big stage to give a major presentation about our pivot. As we would like to share this excitement with a broader audience, this article provides a summary of the presentation, including pictures and commentary. As Nosana is accelerating towards its release, please join us in [Discord](https://discord.gg/nosana-ai) and [Telegram](https://t.me/NosanaCompute) to stay up to date.

---

We live in a world where AI is everywhere. It’s used throughout the industry in every sector, helping with innovation, solving problems, and driving efficiency, but this progress is heavily reliant on an increasingly scarce resource: GPUs. This is not just a minor inconvenience; this is a significant roadblock to realizing the full potential of what artificial intelligence can bring.

But why are GPUs so important for AI? GPUs, or graphics processing units, are specialized chips that can perform parallel computations much faster than CPUs, or central processing units. This makes them ideal for running complex mathematical operations that are required for training and running AI models. GPUs are also used for other applications that require high-performance computing, such as gaming, rendering, simulation, and cryptography.

However, the global demand for artificial intelligence computation exceeds the available on-demand supply. Basically, there are not enough GPUs to run artificial intelligence computations at this point in time. To quote Elon Musk, for example, “_GPUs are considerably harder to get than drugs at this point in time._” He’s referring to acquiring a bunch of GPUs for one of his ventures. The New York Times also published a [recent article](https://www.nytimes.com/2023/08/16/technology/ai-gpu-chips-shortage.html) about the desperate hunt for the AI boom’s most indispensable prize, also referring to startups trying to get their hands on affordable GPUs and having a really hard time doing so. Nvidia is a supplier of GPU chips and they’re having a hard time [keeping up with the demand](https://www.theregister.com/2023/09/19/900_tons_nvidia_servers/). They cannot build them fast enough. Here’s a tweet referring to the current pricing that you’re paying if you rent a GPU in the cloud:

![GPU is the new oil Tweet](./assets/gpuoil.png)

This tweet refers to the H100 chips, which are on the higher end of GPUs that you can use in the cloud. But just to rent this for a month, you would pay $72,000. So just think about how much you would pay for training a model like ChatGPT or another model that requires a lot of GPU computations.

![Graph of AI algorithms](./assets/gpugraph.png)

This graph shows the exponential growth of compute usage over time. Compute is the amount of processing power needed to perform calculations, and it is usually measured in floating point operations per second (FLOPS). The graph also shows the increasing number of models and the compute required to train them in various domains of artificial intelligence (AI), such as games, language, speech, and vision.

The GPU shortage makes it harder than ever for companies to develop AI. We solve this global problem with Nosana, an innovative project that leverages Solana technology to bridge this gap. We're building the world's largest decentralized compute grid to do this. By directly connecting GPUs and AI users, we are revolutionizing the way we can utilize compute power.

Currently, our platform is in private beta. For each AI algorithm, we’re building what we call connectors. These connectors allow you to seamlessly interact with the algorithm.

![Nosana Stable Diffusion graph](./assets/stablediffusion.png)

With our platform running on the Solana blockchain, everything is, of course, transparent. For example, the following image shows a stable diffusion result:

![Stable Diffusion image of an astronaut riding a horse](./assets/moonhorse.png)

The prompt it was given was ‘_a photograph of an astronaut riding a horse_’. The algorithm returned the image. This was all done on the Nosana network.

We’ve also built out the Nosana Explorer. It gives you a live look at what is happening on the network. We’re very happy with it; however, that’s nothing compared to our excitement about what we’ve debuted in our BreakPoint workshop. Until recently, the most conventional way of running a node on our network and sharing your GPU was in a containerized environment. In addition to this, and also as a way to make it easier for anyone to generate passive income, we’ve created what we call the browser node. With the browser node, it’s as easy as opening a tab to log in with your favorite Solana wallet, and it will start running AI models directly on your hardware using WASM and WebGPU.

![Start Earning Slide on stage](./assets/startearning.png)

You can opt for the compute grid that you want to participate in. We’ve set out to make compute accessible and considerably less expensive. Our collaborative network is poised to solve the GPU shortage problem and accelerate AI processes.

We’re honored to have had the chance of not only running a workshop at BreakPoint but also having the incredible experience of presenting from the [developer stage](https://www.youtube.com/watch?v=SGvURRCDk_w)! A big thank you goes to Solana, our friends at Superteam, and all the fantastic projects in the Solana ecosystem that made it to this year’s BreakPoint!
