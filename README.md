# DeepSeek V4 Playground

Experience the latest **DeepSeek V4** model - generate small apps with one prompt. Powered by [EdgeOne Makers Models](https://pages.edgeone.ai/document/models) built-in models.

## Highlights

- **DeepSeek V4**: The latest and most powerful DeepSeek model with enhanced code generation capabilities
- **Edgeone Makers Models**: EdgeOne Makers Models provides built-in models, and can also host self-paid provider keys to proxy requests, delivering low-latency responses
- **Live Preview**: Instantly preview code through an interactive sandbox

## Deploy

[![Deploy with EdgeOne Makers](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=deepseek-v4)

Live Preview: https://deepseek-v4.edgeone.site

More Templates: [EdgeOne Makers](https://pages.edgeone.ai/templates)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AI_GATEWAY_BASE_URL` | Yes | Gateway base URL. When using Edgeone Makers Models, set it to `https://ai-gateway.edgeone.link/v1`. |
| `AI_GATEWAY_API_KEY` | Yes | Model gateway API key. Use a Edgeone Makers Models API Key, or the key of any OpenAI-compatible provider. |

[About Changing Model Invocations](https://pages.edgeone.ai/document/agents-quick-start#038ab1c2-6bd9-4380-a1ee-191262c5d0ec)


## Tech Stack

- [Sandpack](https://sandpack.codesandbox.io/) for the code sandbox
- Next.js App Router with Tailwind

## Supported Models

| Model                              | Description                        |
| :-------------------------------- | :--------------------------------- |
| **`@makers/deepseek-v4-flash`** | Better suited for scenarios that prioritize low latency, high concurrency, and cost efficiency. |
| **`@makers/deepseek-v4-pro`** | Better suited for scenarios that prioritize reasoning capability, higher answer quality, and complex task performance. |


## Get an OpenAI API-Compatible Service

After deployment, this project provides an **OpenAI API-compatible endpoint** that you can configure for use in various AI tools and applications:

- **Endpoint URL**: `https://<your_domain>/v1/chat/completions`
- **Compatible Tools**: Any AI tools and applications that support the OpenAI API format

Simply configure the deployed endpoint URL in your AI tools to start using it.
