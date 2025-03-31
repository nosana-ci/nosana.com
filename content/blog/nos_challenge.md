---
title: "Builders Challenge"
description: Nosana Builder Challenge - Create a Nosana Template
img: /img/nosana_challenge.png
createdAt: "2025-03-31"
tags:
  - product
---

We're thrilled to announce the **Nosana Builders Challenge**, a series of developer-focused contests designed to push the boundaries of AI model deployment on the Nosana Network. This is your opportunity to showcase creativity, gain professional exposure, learn new skills, and compete for over $3,000 in NOS token prizes!

## What is the Builders Challenge?

The Builders Challenge is aimed at encouraging and incentivizing developers to build on the Nosana Network using tools like the Nosana SDK, CLI, and Dashboard. Participants will create new features, tools, and especially templates, to enhance and diversify the Nosana ecosystem.

This challenge will help developers become more familiar with Nosana’s capabilities, ultimately growing a vibrant community of builders.

## First Challenge: Create Nosana Templates

For this inaugural challenge, we are focusing specifically on creating **Templates** for the Nosana Dashboard.

**Nosana Templates** are reusable, pre-built job definition files designed to simplify AI model deployment on Nosana's GPU grid. They allow users to quickly set up complex AI tasks without extensive configuration.

Nosana already provides standard templates, ranging from deploying [DeepSeek LLMs](https://dashboard.nosana.com/jobs/create?templateId=qwen1.5b&randKey=3z707fh1chn) to running a [VSCode instance](https://dashboard.nosana.com/jobs/create?templateId=vscode-server&randKey=akqekx4zh0n). You can explore more examples in the [Templates section of the Dashboard](https://dashboard.nosana.com/jobs/templates).

## How to Participate

You can create a new template by crafting a [Nosana Job Definition File](https://docs.nosana.com/inference/writing_a_job.html). This can be done either:

- Directly through the Nosana Dashboard Interface, or
- By creating and editing a JSON file locally with your preferred text editor, then submitting it to the Nosana Network using the Nosana CLI Tool.

AI models are preferred, but other interesting use cases like analytics or development environments are also welcome.

### Submission Instructions

Follow these clear steps to submit your template:

1. Fork the [Nosana GitHub Template Repository](https://github.com/nosana-ci/pipeline-templates/tree/main).
2. Create your new template JSON file based on your chosen AI model or other innovative use-case.
3. Submit a Pull Request clearly describing your template, its intended use-case, and implementation specifics.
4. Ensure your template is functional and deployable directly from the Nosana Dashboard.

### Example Job Definition File

Here's a corrected example of running a DeepSeek R1 LLM on Nosana:

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
- **Popularity of AI Model:** Implementation of widely-used or cutting-edge AI models.
- **Technical Interest:** Efficient, scalable, or uniquely creative use of Nosana’s capabilities.
- **Diversity of Models:** Varied implementations including LLMs, GANs, Stable Diffusion, analytics, and other inferencing models.

## Prizes

We have over $3,000 in prizes for the top 10 submissions:

- **1st Place:** 1500 NOS ($1000)
- **2nd Place:** 1100 NOS ($750)
- **3rd Place:** 700 NOS ($500)
- **4th Place:** 350 NOS ($250)
- **5th - 10th Place:** 135 NOS ($100 each)

All competition prizes are direct payouts and not vested.

## Tutorial & Resources

For a comprehensive tutorial and additional insights into how Nosana works, how to run models, and best practices, visit:

- [Nosana Full Tutorial](https://docs.nosana.io/tutorials/llm/deepseek.html)
- [Builders Challenge Page](https://earn.superteam.fun/listing/nosana-builders-challenge/) (for detailed participation information)

We look forward to your incredible contributions. Don’t miss this chance to shape the future of decentralized AI inferencing!

Happy Building!
