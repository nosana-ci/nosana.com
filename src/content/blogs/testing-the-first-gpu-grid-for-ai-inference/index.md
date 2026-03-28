---
category: "blog"
title: "Testing the First GPU Grid for AI Inference"
description: "Nosana has successfully tested the first decentralized GPU grid developed and customized for AI inference workloads."
thumbnail: "./assets/test-grid-blog-banner.png"
createdAt: "2024-02-05"
tags:
  - "product"
---

The first phase of the Nosana Test Grid has concluded. We want to give
a big shout-out to everyone involved and who contributed! During these
weeks, many components of the Nosana GPU grid were put to the test.
Over a hundred GPU nodes managed to connect and were assigned to
various AI-inference workloads, benchmarks, and other tasks over six
weeks. This has provided us with valuable input for the development of
the network and has marked the way forward.

In this article, we will summarize the key achievements, insights
gained, and future improvements identified during the inaugural phase
of the Nosana Test Grid, shedding light on the successful onboarding
process, diverse AI-inference workloads, and the invaluable feedback
received from participants that will guide us in enhancing the Nosana
network for its next phase.

## Test Grid Goals

The Test Grid was the first public GPU grid on the Nosana network, and
an essential part of the process was establishing how nodes are
identified, selected, and assigned to the grid. Nosana is committed to
enabling underutilized consumer hardware and is designed to support a
wide variety of hardware owned by semi-technical users. This means
that we consider the onboarding process to be an essential part of the
project. To provide personal assistance and process all feedback
promptly, the number of Test Grid nodes was capped at 110. The
selection included a wide range of device types and a good
geographical distribution.


## Onboarding Process

During the first stop in the Test Grid application, users had to
download the [Nosana Node](https://github.com/nosana-ci/nosana-node)
software, follow the [node configuration
guide](https://docs.nosana.io/nodes/grid.html), run a [benchmark
job](http://explorer.nosana.io/jobs/GUhQsFv2Dd6UUAgpcHpVCncodCHQMADGCJqvB6m6CdMe?network=devnet),
and use the results to submit the Test Grid application form. A total
of 442 nodes went through this process and provided an abundance of
feedback. During onboarding, we accomplished the following:

- Complete support for both Windows and Linux-based nodes
- Connected nodes from 47 different countries
- A total of 22 different GPU models were connected
- The majority of users rated the experience as "Smooth as butter"

The team has collected all feedback and will release an updated guide
and video tutorial based on this. From the total onboarded nodes, a
selection of 112 users was made, and they received an access NFT that
activated their nodes. To properly test various use cases,
participants were divided into Test Grid Markets based on their GPU
model.

<div style="width: 100%; margin: 0 auto;">
<img alt="Chart of GPU types" src="/img/test-grid-gpu-chart.png" loading="lazy" decoding="async" />
</div>

## Nosana Explorer

Nosana has released an interface to inspect the Test Grid in detail:
[https://explorer.nosana.io](https://explorer.nosana.io). This enables
anyone to look 'behind the scenes' of the Nosana test grid, revealing
real-time data and statistics. This interface is crucial for our team,
as it enhances transparency with our community and users, providing a
deeper understanding of the Test Grid's operations.

## AI Inference Workloads

The Test Grid was divided into 13 compute markets of devices with
similar specifications. These markets are continuously filled with a
variety of GPU compute jobs. The majority of the AI workloads were
targeted at image generation tasks using Stable Diffusion and speech
recognition tasks using Whisper. Some jobs mimicked production
workloads, while others aimed at stress testing and benchmarking the
network to its limits. Here's an overview of the number of jobs that
were run:

Successful jobs: 139,749
Total job duration: 35,773.7 hours (or 1,490.6 days)
Audio hours transcribed: 158,260.3 hours (or 6,594.2 days)
Images generated: 935,097

<div style="width: 100%; margin: 0 auto;">
<img alt="AI-Inference workload log " src="/img/test-grid-inference-log.png" loading="lazy" decoding="async" />
</div>

## Future Improvements

Over 300 Discord tickets were raised and addressed throughout the Test
Grid. As the Test Grid concluded, participants submitted feedback
forms, and our team organized a Discord Live session to delve deeper
into discussions on additional feedback. Undoubtedly, these
interactions have been the most valuable aspects of our experience.

- **Making the network more robust** During the Test Grid, there were cases where compute jobs could not be finalized due to external factors. The causes ranged from malfunctioning RPC nodes and congestion on Solana to GPU reliability. The Nosana software will be adapted to be more resilient when finalizing executed compute jobs, so nodes will not miss out on payments.

- **Allow more flexible GPU setups** At several occasions, participants requested more flexibility when it comes to upgrading and switching GPUs. Some users with advanced multi-GPU setups could only contribute one GPU at a time. Others upgraded their GPU to maximize income or wanted to switch between different GPU models during the day. We intend to support all these scenarios in future versions of Nosana.

<div style="width: 75%; margin: 0 auto;">
<img alt="User feedback " src="/img/test-grid-feedback.png" loading="lazy" decoding="async" />
</div>

## Next Steps

The nodes currently connected to the Test Grid can keep running
workloads and will continue to receive $NOS rewards. Nodes on the
waitlist should keep an eye on their inbox, as the onboarding process
is progressing gradually. In the meantime, the Nosana team is
preparing for Phase 2 of the Test Grid. During this phase, job
diversity will increase, allowing end-users to run actual workloads on
the network.

For those interested in joining the waitlist for Nosana Test Grid
Phase 2, please register [here](https://docs.google.com/forms/d/e/1FAIpQLSfSBq9TLH4nzG6OL3BEDZaqWokiOTphYWa_7VESEQxpXJRlLQ/viewform).
