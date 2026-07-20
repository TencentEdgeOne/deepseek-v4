# DeepSeek V4 Playground

体验最新的 **DeepSeek V4** 模型 - 通过一个提示生成小型应用程序。由 [EdgeOne Makers Models](https://pages.edgeone.ai/zh/document/models) 内置模型提供支持。

## 亮点

- **DeepSeek V4**：最新、最强大的 DeepSeek 模型，具有增强的代码生成能力
- **Makers Models**：EdgeOne Makers Models提供内置模型，也可托管自费厂商密钥代理请求，提供低延迟响应
- **实时预览**：通过交互式沙箱即时预览代码

## 部署

[![使用 EdgeOne Makers 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?template=deepseek-v4)

在线预览：https://deepseek-v4.edgeone.site

更多模板：[EdgeOne Makers](https://pages.edgeone.ai/templates)

## 环境变量

| 变量 | 是否必填 | 说明 |
|----------|----------|-------------|
| `AI_GATEWAY_BASE_URL` | 是 | 网关 Base URL。使用 Makers Models 时填写 `https://ai-gateway.edgeone.link/v1`。 |
| `AI_GATEWAY_API_KEY` | 是 | 模型网关 API Key。使用 Makers Models API Key，或任意 OpenAI 兼容供应商的 Key。 |

[关于更换模型调用](https://pages.edgeone.ai/zh/document/agents-quick-start#038ab1c2-6bd9-4380-a1ee-191262c5d0ec)


## 技术栈

- [Sandpack](https://sandpack.codesandbox.io/) 用于代码沙箱
- 使用 Tailwind 的 Next.js App 路由

## 支持的模型

| 模型                              | 描述                        |
| :-------------------------------- | :-------------------------- |
| **`@makers/deepseek-v4-flash`** | 更适合追求低延迟、高并发和成本效率的场景。 |
| **`@makers/deepseek-v4-pro`** | 更适合追求推理能力、更高回答质量和复杂任务表现的场景。 |


## 获取 OpenAI API 兼容服务

部署完成后，该项目会提供一个 **OpenAI API 兼容的接口**，您可以将其配置到各种 AI 工具和应用中使用：

- **接口地址**：`https://<your_domain>/v1/chat/completions`
- **兼容工具**：任何支持 OpenAI API 格式的 AI 工具和应用

只需将部署后的接口地址配置到您的 AI 工具中即可开始使用。
