---
title: "Builders Challenge"
description: Nosana Builder Challenge - Create a Nosana Template
img: /img/nosana_builders_challenge.jpg
createdAt: "2025-03-31"
tags:
  - product
---

We’re thrilled to launch the **Nosana Builder Challenge**, a developer-focused contest designed to push the boundaries of AI model deployment on the **Nosana Network**. This is your chance to showcase your skills, gain visibility, learn new tools — and compete for over **$3,000 USDC in prizes**!

## TL;DR

- Create reusable Nosana Templates for deploying AI models.

- Submit via GitHub PR to win USDC prizes.

- **$3,000+** total rewards for top 10 submissions.

- Deadline is **14 of April 12.00 UTC**.

- Submission details: [Builders Challenge Page](https://earn.superteam.fun/listing/nosana-builders-challenge/)

## What is the Builders Challenge?

The Builder Challenge empowers developers to build powerful tools, features, and in this 1st edition [Templates](https://dashboard.nosana.com/jobs/templates/) using the [Nosana SDK](https://github.com/nosana-ci/nosana-sdk), [CLI](https://github.com/nosana-ci/nosana-cli), and [Dashboard](https://dashboard.nosana.com/). It's all about growing a strong community of builders who can unlock the full potential of decentralized AI inferencing on Nosana.

## First Challenge: Create Nosana Templates

For our first edition, we’re zooming in on **Nosana Templates** — reusable, pre-built job definition files that simplify AI model deployment on Nosana’s decentralized GPU network.

**Nosana Templates** are reusable, pre-built job definition files designed to simplify AI model deployment on Nosana's GPU grid. They allow users to quickly set up complex AI tasks without extensive configuration.

Templates let users launch complex AI workloads quickly, without deep configuration. Current templates include deploying [DeepSeek LLMs](https://dashboard.nosana.com/jobs/create?templateId=qwen1.5b&randKey=3z707fh1chn) or running a [VSCode instance](https://dashboard.nosana.com/jobs/create?templateId=vscode-server&randKey=akqekx4zh0n). You can explore more examples in the [Templates section of the Dashboard](https://dashboard.nosana.com/jobs/templates).

## How to Participate

Build a new template by creating a Nosana Job Definition File. You can do this:

You can create a new template by crafting a [Nosana Job Definition File](https://docs.nosana.com/inference/writing_a_job.html). This can be done either:

- Directly through the Nosana Dashboard Interface, or
- By creating and editing a JSON file locally with your preferred text editor, then submitting it to the Nosana Network using the Nosana CLI Tool.

While we encourage AI models, feel free to get creative — analytics or dev tools are welcome too!

### Submission Instructions

Follow these clear steps to submit your template:

1. Fork the [Nosana GitHub Template Repository](https://github.com/nosana-ci/pipeline-templates/tree/main).
2. Create your new template JSON file based on your chosen AI model or other innovative use-case.
3. Submit a Pull Request clearly describing your template, its intended use-case, and implementation specifics.
   - A new folder for your Nosana Template with the following files:
   - `job-definition.json`: Standard Nosana Job Definition JSON File
   - `info.json`: JSON file with display information for the dashboard
   - `README.md`: README file with a description of the Job Definition, Models, any other relevant information about the job.
4. Ensure your template is functional and deployable directly from the Nosana Dashboard.
5. Last but not least also do a submission at the [Builder Challenge Page](https://earn.superteam.fun/listing/nosana-builders-challenge/)

### Example Template

Here’s an example for deploying a DeepSeek R1 LLM:

```json
{
  "version": "0.1",
  "type": "container",
  "meta": {
    "trigger": "cli"
  },
  "ops": [
    {
      "type": "container/run",
      "id": "deepseek-r1-qwen-1.5b",
      "args": {
        "entrypoint": [
          "/bin/sh",
          "-c",
          "python3 -m vllm.entrypoints.openai.api_server --model deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B --served-model-name R1-Qwen-1.5B --port 9000 --max-model-len 130000"
        ],
        "image": "docker.io/vllm/vllm-openai:latest",
        "gpu": true,
        "expose": 9000
      }
    }
  ]
}
```

In this example, we're using the [vLLM](https://vllm.com/) Docker image, but feel free to choose any container image suitable for your needs.

## Judging Criteria

Submissions will be evaluated based on:

- **Creativity:** Original and innovative template ideas.
- **Popularity of AI Model:** Implementation of widely-adopted or cutting-edge AI models.
- **Technical Interest:** Efficient, scalable, or uniquely creative use of Nosana’s capabilities.
- **Diversity of Models:** Varied implementations including LLMs, GANs, Stable Diffusion, analytics, and other inferencing models.

## Prizes

We’re awarding the **top 10 submissions**:

- 🥇 1st: $1,000 USDC
- 🥈 2nd: $750 USDC
- 🥉 3rd: $500 USDC
- 🏅 4th: $250 USDC
- 🔟 5th–10th: $100 USDC

All prizes are paid out directly.

## Tutorial & Resources

For a comprehensive tutorial and additional insights into how Nosana works, how to run models, and best practices, visit:

- [Nosana Full Tutorial](https://docs.nosana.io/tutorials/llm/deepseek.html)
- [Builders Challenge Page](https://earn.superteam.fun/listing/nosana-builders-challenge/) (for detailed participation information)

### Don’t Miss Nosana Builder Challenge Updates

---

Join our [Discord](https://nosana.com/discord) where we have dedicated [Builders Challenge Dev chat](https://discord.com/channels/236263424676331521/1354391113028337664) for technical support and information.

Join our [Telegram](https://nosana.com/telegram) or follow us on [X](https://nosana.com/x) for the latest Nosana and NOS announcements.

**Happy Building!**
