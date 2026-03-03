---
category: "blog"
title: "Nosana's New Direction: AI Inference"
description: "GPU-compute grid for AI inference"
thumbnail: "./assets/browser_node.png"
createdAt: "2023-10-13"
tags:
  - "product"
---

Today, we’re excited to share a significant update about the future of Nosana. After careful consideration, we’ve decided to pivot away from CI/CD services. Instead, Nosana will now focus on providing a massive GPU-compute grid for AI inference.

### The Journey So Far
Two years ago, we embarked on a mission to solve the painful dependence and lock-in that software developers face when shipping code. Our solution, Nosana, was designed as a decentralized automation provider that pooled together compute hardware for any developer to use freely, creating a marketplace where everyone can connect their machines with developers running CI/CD pipelines. Fast forward a year and a half, and we successfully built that computing platform. A dozen projects were using it daily to develop, build, and test their software. However, we started noticing challenges with gaining traction in the CI/CD market.

### The Challenges with CI/CD
Despite our innovative approach, the CI/CD market didn’t provide the traction we sought. Most people consider CI/CD a “solved” problem and are hesitant to migrate to a new tool, even if it offers a superior, decentralized solution. Interestingly, one of our competitors reached the same conclusion and shared their insights about the subtleties of the CI/CD market and their pivot. It turns out that decentralization in itself is not a good enough reason for developers to leave the comforts of the tools they are already used to using every day.
We tried developing a platform that was familiar enough to onboard developers easily, but this was enough. Developers don’t want to spend too much time learning the intricacies of a new notation system in order to use a product with half the features that are available with their current offering and an experimental platform. 
It’s a big ask, and we figured out that most developers are unwilling to invest in learning how to use our platform, even though we tried to make it easy to use for them.

### The Opportunity in AI
The founders of Nosana have been at the forefront of artificial intelligence research for a long time. For the past couple of years, we’ve seen innovations happening in the AI space, with Alpha Go and Hugging Face’s generators indicating the rumblings of what was to come. 
The release of OpenAI’s Large Language Model, ChatGPT, almost a year ago marked a significant leap forward in the industry. Following its release, open-source AI models advanced rapidly, and demand for them rose quickly. GPUs are the cornerstone of these technologies. The same power that makes it possible to render beautiful graphics in your favorite video game also makes it possible to train and talk to ChatGPT. GPUs became increasingly scarce and expensive as companies started training and running these new models. Giant corporations have already bought up stock for the upcoming two years to meet their own demand because manufacturing hasn't been able to keep up with the sudden demand for GPUs.

Meanwhile, many GPUs that belong to gamers, miners, and users of high-end devices are largely underused. GPU benchmark data suggests many use cases where you do not need the newest, most powerful GPUs on the market. Consumer-grade GPUs not only provide high availability but also deliver more inferences per dollar compared to major cloud providers.

### Nosana’s New Direction
This is precisely what Nosana was built to solve: a decentralized market that matches hardware with demand. The Nosana compute engine that was built for CI/CD is flexible enough to run GPU workloads as well.
In a matter of hours, we were able to connect some GPUs to the Nosana cluster and run a demo with AI workloads. All the technical ingredients are there; we’re preparing the same dish just for a different customer.

### What Will Change?
As we shift our focus to building out the Nosana GPU grid, we will still discontinue support for the CI/CD platform by the end of this year. However, this doesn’t mean it will become obsolete. Existing CI/CD workloads will continue to run as long as someone hosts a compatible compute node and a connector. This is a testament to our original mission: no lock-in and complete freedom.
Moving forward, our new mission is to connect existing GPUs to the growing demand. So, what does this look like?

#### GPU Support and Easy Onboarding
Firstly, we will start rolling out GPU support for Nosana Nodes, enabling you to run GPU jobs on your machine. We’re also prototyping new methods to make running GPU workloads on your machine easier.
There are a couple of components to this. First off, as mentioned before, we will be expanding the different kinds of compute jobs that can be run on the Nosana Network. Starting with a focus on jobs that require GPUs, such as AI inference. You won’t need to pay to use OpenAI’s API anymore to do inference; you can determine the model you want to use and Nosana will connect you with one.

So now you will also be able to run smaller compute jobs instead of a whole pipeline. We have created a Nosana SDK that will make it easier for us and you to integrate Nosana into the applications we use every day. Such as the Nosana CLI tool, which will let you publish a compute job to the Nosana Network with one simple command.
Embracing this new direction, we are also building out our Nosana Explorer, which will make it easier to go into the different kinds of compute jobs on Nosana.

During this journey, we realized that installing and running the Nosana Node software can be challenging for users. We believe we’ve found an innovative solution and are currently prototyping it. Imagine hosting a node within your browser being as easy as visiting a URL and connecting your wallet to host your machine on the network! By leveraging technologies such as WebAssembly, we aim to create the easiest GPU-node onboarding experience on the web.

We’re excited about this new direction and look forward to sharing more updates soon.
