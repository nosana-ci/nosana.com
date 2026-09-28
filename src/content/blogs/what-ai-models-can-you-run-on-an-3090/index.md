---
category: "blog"
title: "What AI Models Can You Run on an RTX 3090? 6 Examples You Can Deploy on Nosana"
description: ""
thumbnail: "./assets/Nosana-RTX3090-blog.jpg"
createdAt: "2026-09-28"
tags:
  - "news"
---

An NVIDIA RTX 3090 has 24 GB of VRAM, enough to run a range of AI workloads when the model and serving configuration are chosen carefully. On Nosana, developers can deploy models for six practical use cases on RTX 3090 GPUs: text generation, AI agents, coding assistance, document OCR, image generation, and speech transcription.

This guide shows which model to use for each workload, how much GPU memory it is estimated to need, and how to deploy it on Nosana. Actual memory use and performance depend on factors such as quantization, context length, serving software, and the number of simultaneous requests.

For most use cases you don’t need a flagship frontier model to help you do your work. Oftentimes smaller models can be used to achieve your goals and at a fraction of the cost.

You do not need the newest data center GPU to put useful AI into production. With 24 GB of VRAM, the [NVIDIA RTX 3090](https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3090-3090ti/) can handle a surprisingly broad range of workloads, from language models and coding assistants to image generation and speech.

On [Nosana](https://nosana.com/), developers can access distributed RTX 3090 capacity without buying hardware or committing to a long term cloud contract. This guide covers six practical use cases, recommends a suitable model for each one and explains what to expect from a single RTX 3090\.

The figures below are practical estimates rather than fixed limits. Actual memory use and performance depend on the model version, precision, context length, serving framework and number of simultaneous requests.

## **At a Glance**

| Use case          | Recommended model                                                                        |          Approximate VRAM | Serve with |
| :---------------- | :--------------------------------------------------------------------------------------- | ------------------------: | :--------- |
| Text generation   | [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B)                                     |       6.6 GB plus context | Ollama     |
| Agentic workflows | [GLM-4.7-Flash](https://huggingface.co/zai-org/GLM-4.7-Flash)                            |        19 GB plus context | Ollama     |
| Coding            | [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) |        19 GB plus context | Ollama     |
| Document OCR      | [Nanonets-OCR2-3B](https://huggingface.co/nanonets/Nanonets-OCR2-3B)                     | About 7.5 GB plus context | vLLM       |
| Text to image     | [FLUX.1 schnell FP8](https://huggingface.co/Comfy-Org/flux1-schnell)                     |               About 12 GB | ComfyUI    |
| Speech to text    | [Whisper large-v3](https://huggingface.co/openai/whisper-large-v3)                       |         Well within 24 GB | Gradio     |

## **How to Deploy These Models on Nosana**

Choose a model from the table and open its Nosana deployment link in the section below. In Nosana Deploy, select the RTX 3090 GPU market, review the template and deployment settings, then create the deployment. Once it starts, Nosana provides a service endpoint you can use to access the model.

You can also deploy from the command line using the job definitions linked in each section. You’ll need a Nosana account and sufficient GPU credits to run the workload.

## **Why 24 GB of VRAM Goes Further than You Might Think**

Even though 24GB of VRAM does not sound like a lot, it is plenty when combined with techniques to make AI models more efficient and optimized.

AI labs release different sizes of the same model, by specifying how many parameters the models can input and output.

Model size is not determined by the number of parameters alone. The precision used to store the weights makes a major difference:

> - BF16 (Brain Floating Point 16\) or FP16 (Floating Point 16\) uses roughly 2 GB per billion parameters.
> - 8 bit precision uses roughly 1 GB per billion parameters.
> - 4 bit quantization commonly uses around 0.5 to 0.6 GB per billion parameters.

This is why an 8B model can run in BF16 on an RTX 3090, while a much larger model may fit when quantized to 4 bits. For example, GLM-4.7-Flash would require roughly 62 GB for its BF16 weights, but its 4 bit Q4_K_M build is about 19 GB.

Quantization slightly reduces model accuracy, but the tradeoff can be worthwhile when it allows a stronger model to run on a single affordable GPU. For the language models in this guide, the Nosana templates serve 4 bit quantized builds through Ollama. This keeps even 30B models within the card's 24 GB limit while leaving room for context. BF16 remains a good choice for smaller models that already fit, such as the OCR model in section 4\.

Memory still needs to be reserved for the runtime, input data and, for language models, the active context. A model whose weights occupy almost all 24 GB may require a shorter context or lower concurrency.

## **1\. Can an RTX 3090 Run Qwen3.5-9B for Text Generation?**

Yes. [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) can run on an RTX 3090 using a 4 bit quantized build served through Ollama. The model uses approximately 6.6 GB of VRAM before context and runtime overhead, leaving room for an API endpoint and the context your application needs.

Qwen3.5-9B supports tool use and switchable reasoning and is released under the Apache 2.0 license. It is a practical starting point for chatbots, summarization, retrieval augmented generation, question answering, and internal assistants. The context length and number of simultaneous requests you can support will depend on the deployment configuration.

##### **Nosana Deployment**

The easiest way to deploy Qwen3.5-9B on Nosana is through the [Nosana Deploy Dashboard](https://deploy.nosana.com/deployments/create?template=qwen3-5-9b). Open the template, select an RTX 3090 GPU market, and create your deployment.

##### **CLI Deployment**

The following job definition serves Qwen3.5-9B with Ollama through an OpenAI compatible endpoint. One complete example is included here to show the deployment pattern. The same approach can be adapted for the other Ollama models in this guide by changing the model and memory requirement.

If you prefer using the cli:

1. Download [job-definition-9b.json](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/Qwen3.5/job-definition-9b.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) to your desktop
2. Install the Nosana CLI:

```sh
npm install -g @nosana/cli
```

3. Create an account on [Nosana Dashboard](https://deploy.nosana.com/account)
4. Buy Credits, to top up your Credit balance
5. [Get your API Key](https://learn.nosana.com/api/get-api-key.html)
6. Run:

```sh
nosana job post --file job-definition-9b.json --wait --market nvidia-3090 --api <your-api-key>
```

Learn more about CLI deployments at our [CLI Quick Start Guide](https://learn.nosana.com/inference/quick_start.html)

After deployment, send requests to the service URL:

```sh
curl https://<nosana-service-url>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.5:9b",
    "messages": [
      {
        "role": "user",
        "content": "Explain what a GPU marketplace is in two sentences."
      }
    ]
  }'
```

The service URL is public. Protect any persistent or production deployment with authentication rather than exposing an unrestricted endpoint.

## **2\. Can an RTX 3090 Run an AI Agent with GLM-4.7-Flash?**

Yes. [GLM-4.7-Flash](https://huggingface.co/zai-org/GLM-4.7-Flash) from Z.ai can run on an RTX 3090 as a 4 bit quantized model served through Ollama. Its model weights use approximately 19 GB of VRAM, leaving limited room for context and runtime overhead on the GPU’s 24 GB.

GLM-4.7-Flash is a mixture of experts model with about 30B total parameters and 3B active per token, released under the MIT license. It is suited to focused agents that choose tools, interpret results, and work through multiple steps, including research, browser automation, terminal workflows, and applications using MCP tools. On a single RTX 3090, shorter contexts and lower concurrency are more realistic than long autonomous sessions.

Its strength shows in agent benchmarks. Z.ai reports a score of 79.5 on τ²-Bench, which measures tool use in multi turn conversations, and 42.8 on BrowseComp, which tests web research. Qwen3-30B-A3B-Thinking-2507, a model of similar size, scores 49.0 and 2.29.

The full BF16 model is too large for an RTX 3090 at roughly 62 GB, but its 4 bit Q4_K_M build served through Ollama is about 19 GB. Because only 3B parameters are active per token, it stays responsive across the many calls an agent loop makes. The remaining memory limits the context, so it is best suited to focused workflows rather than very long autonomous sessions.  
When longer context or faster responses matter more than maximum planning quality, Qwen3.5-9B from the previous section is a lighter alternative.

##### **Nosana Deployment**

Try it now at: [Nosana Dashboard](https://deploy.nosana.com/deployments/create?template=glm-4-7-flash-glm-47-flash-q4)

##### **CLI Deployment**

To deploy GLM-4.7-Flash from the command line, use its [job definition](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/GLM-47-flash/job-definition-GLM-q4.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) and post it to the nvidia-3090 market as shown in section 1\.

## **3\. Can an RTX 3090 Run a Coding Assistant with Qwen3-Coder?**

Yes. [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) can run on an RTX 3090 as a 4 bit quantized model served through Ollama. Its model weights use approximately 19 GB of VRAM, leaving limited space for context and runtime overhead.

Qwen3-Coder is a mixture of experts model with 30B total parameters and about 3B active per token. It can support code generation, refactoring, test creation, code review, and editor based assistance. Ollama exposes an OpenAI compatible endpoint, which you can connect to coding tools that accept a custom base URL. On a single RTX 3090, test the context length and response speed against your intended workflow before relying on it for larger projects.

Its 4 bit quantized version served through Ollama occupies approximately 19 GB, leaving room for a useful context window on the RTX 3090\. Ollama exposes an OpenAI compatible endpoint, so it can be connected to tools that accept an OpenAI compatible base URL.  
This creates a practical foundation for a private coding assistant whose inference runs on a dedicated Nosana deployment rather than a shared third party API.

##### **Nosana Deployment**

Try it now at: [Nosana Dashboard](https://deploy.nosana.com/deployments/create?template=qwen3-30b-coder)

##### **CLI Deployment**

To deploy Qwen3-Coder-30B from the command line, use its [job definition](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/Qwen3/job-definition-30b-coder.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) and post it to the nvidia-3090 market as shown in section 1\.

## **4\. Can an RTX 3090 Run Document OCR with Nanonets-OCR2-3B?**

Yes. [Nanonets-OCR2-3B](https://huggingface.co/nanonets/Nanonets-OCR2-3B) can run on an RTX 3090 through a Nosana template served with vLLM. Its BF16 model weights use approximately 7.5 GB of VRAM, leaving room for the serving software and document inputs. Actual usage depends on page size and the number of requests processed at once.

Nanonets-OCR2-3B is useful for extracting information from invoices, forms, contracts, tables, scanned documents, and handwritten notes. It turns page images into structured content that another application or language model can use: tables as HTML or markdown, equations as LaTeX, and flowcharts as Mermaid code. It can also identify signatures, watermarks, and page numbers, represent checkboxes as ☐ or ☑, and describe images within a document.

It reads handwriting and documents in many languages, including English, Chinese, Japanese, Arabic and most European languages. You can also ask it a question about a document, such as “What is the invoice total?”, and it answers directly or replies “Not mentioned.”  
At about 3.75B parameters, its BF16 weights take roughly 7.5 GB, leaving most of the RTX 3090's memory for long, dense pages and several requests at once. The model is built on Qwen2.5-VL-3B, which is released under Qwen's research license, so check the license terms before using it commercially.

##### **Nosana Deployment**

Try it now at: [Nosana Dashboard](https://deploy.nosana.com/deployments/create?template=Nanonets-OCR2-3b). The deployment serves an OpenAI compatible endpoint through vLLM, so you can send a page image and a prompt to /v1/chat/completions and get the structured text back.

##### **CLI Deployment**

To deploy Nanonets-OCR2-3B from the command line, use its [job definition](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/Nanonets-OCR2/job-definition-3b.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) and post it to the nvidia-3090 market as shown in section 1\.

## **5\. Can an RTX 3090 Run FLUX.1 Schnell for Image Generation?**

Yes. [FLUX.1 schnell](https://huggingface.co/Comfy-Org/flux1-schnell) from Black Forest Labs can run on an RTX 3090 using an FP8 version of the model in a ComfyUI workflow. This 12B parameter model needs approximately 12 GB of VRAM for its weights, leaving room within the GPU’s 24 GB for the rest of the workflow. Actual memory use also depends on image resolution and workflow settings.

FLUX.1 schnell is built for speed and can generate an image in as few as one to four steps. It is released under the Apache 2.0 license and is useful for marketing visuals, product concepts, illustrations, storyboards, and creative experiments. Stable Diffusion XL may be a better fit if your priority is its larger ecosystem of community workflows and LoRAs.

##### **Nosana Deployment**

Try it now at: [Nosana Dashboard](https://deploy.nosana.com/deployments/create?template=comfyui-flux). Select an RTX 3090 market, open the service URL and load a FLUX.1 schnell workflow.

##### **CLI Deployment**

To deploy FLUX.1 schnell from the command line, use its [job definition](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/ComfyUI/job-definition-flux.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) and post it to the nvidia-3090 market as shown in section 1\.

## **6\. Can an RTX 3090 Run Whisper Large-v3 for Speech Transcription?**

Yes. [Whisper large-v3](https://huggingface.co/openai/whisper-large-v3) can run on an RTX 3090\. At about 1.5B parameters, the model uses only part of the GPU’s 24 GB of VRAM, leaving capacity for audio processing and additional requests. Actual throughput depends on the serving setup, audio length, and number of simultaneous requests.

Whisper large-v3 is OpenAI’s speech recognition model, released under the MIT license. It can transcribe speech in around 100 languages and translate spoken audio into English text. It processes long recordings in 30 second segments, making it useful for meeting and interview transcripts, subtitles, podcast and video indexing, and voice notes.

##### **Nosana Deployment**

Try it now at: [Nosana Deploy Dashboard](https://deploy.nosana.com/deployments/create?template=whisper-asr). Open the service URL to upload or record audio, choose whether to transcribe or translate it, and get the text back in the browser.

##### **CLI Deployment**

To deploy Whisper large-v3 from the command line, use its [job definition](https://github.com/nosana-ci/pipeline-templates/blob/main/templates/Whisper-ASR/job-definition.json) from the [Nosana pipeline templates repository](https://github.com/nosana-ci/pipeline-templates/tree/main) and post it to the nvidia-3090 market as shown in section 1\.

## **Choosing the Right Workload for an RTX 3090**

The RTX 3090 is strongest when the entire workload fits inside its 24 GB of VRAM without relying heavily on system memory. It is particularly well suited to:

- 7B to 8B language and multimodal models in BF16
- Larger language and coding models in 4 bit quantized formats
- Image generation
- Lightweight speech workloads

A newer or higher memory GPU becomes the better choice when the model still exceeds 24 GB after quantization, depends on FP8 or FP4 acceleration, needs a very long context, or must serve high concurrency with predictable latency.

The important point is that many production worthy AI applications do not require the most expensive GPU available. Matching the model and serving configuration to the workload can make an RTX 3090 a capable and cost effective foundation for deployment.

## **Start Building on Nosana**

A single RTX 3090 can take you from an AI idea to a working application. Pick the model that fits what you’re building, deploy it on Nosana, and connect its endpoint to your app. As you test with real requests, you can tune the model, context length, and concurrency to find the right setup.

[Explore AI workloads on Nosana](https://deploy.nosana.com)

## **Resources**

- [Nosana job definition schema](https://learn.nosana.com/deployments/jobs/job-definition/schema.html)
- [Nosana deployment dashboard](https://deploy.nosana.com)
- [Models associated with RTX 3090 hardware on Hugging Face](https://huggingface.co/models?hardware=rtx-3090)

## Useful Links

- [Nosana Website](https://nosana.com/)
- [Join the Discord](https://nosana.com/discord)
- [Follow us on X](https://nosana.com/twitter/)
- [Nosana on GitHub](https://nosana.com/github/)
- [Nosana Grants Program Page](https://nosana.com/grants)
