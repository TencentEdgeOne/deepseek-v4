import { z } from 'zod';

const messageItemSchema = z
  .object({
    role: z.enum(['user', 'assistant', 'system', 'tool', 'function']),
    content: z.string().nullable().optional(),
  })
  .passthrough();

const allowModelList = [
  '@makers/deepseek-v4-flash',
  '@makers/deepseek-v4-pro',
] as const;

function isAllowedModel(
  model: string | undefined,
): model is (typeof allowModelList)[number] {
  return allowModelList.includes(model as (typeof allowModelList)[number]);
}

const messageSchema = z
  .object({
    messages: z.array(messageItemSchema),
    model: z.string().optional(),
    stream: z.boolean().optional(),
    tools: z.any().optional(),
    tool_choice: z.any().optional(),
    functions: z.any().optional(),
    function_call: z.any().optional(),
    temperature: z.number().optional(),
    top_p: z.number().optional(),
    max_tokens: z.number().optional(),
    presence_penalty: z.number().optional(),
    frequency_penalty: z.number().optional(),
    stop: z.union([z.string(), z.array(z.string())]).optional(),
    response_format: z.any().optional(),
    seed: z.number().optional(),
    user: z.string().optional(),
    n: z.number().int().optional(),
    logit_bias: z.record(z.string(), z.number()).optional(),
    parallel_tool_calls: z.boolean().optional(),
    stream_options: z.any().optional(),
  })
  .passthrough();

/**
 * Create standardized response with CORS headers
 */
function createResponse(body: any, status = 200, extraHeaders = {}): Response {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...extraHeaders,
  };

  return new Response(JSON.stringify(body), { status, headers });
}

/**
 * Handle OPTIONS request for CORS preflight
 */
function handleOptionsRequest(): Response {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequest({ request, env }: any) {
  if (request.method === 'OPTIONS') {
    return handleOptionsRequest();
  }

  request.headers.delete('accept-encoding');

  try {
    const json = await request.clone().json();
    const parseResult = messageSchema.safeParse(json);

    if (!parseResult.success) {
      return createResponse({ error: parseResult.error.message });
    }

    const { messages, model, stream, ...extraParams } = parseResult.data;

    const userMessages = messages.filter((message) => message.role === 'user');
    if (!userMessages.length) {
      return createResponse({ error: 'No input message found' });
    }

    if (
      userMessages.some((message) => typeof message.content !== 'string')
    ) {
      return createResponse({ error: 'Invalid user message content' });
    }

    const MODEL = model ?? allowModelList[0];
    if (!isAllowedModel(MODEL)) {
      return createResponse(
        {
          error: `Unsupported model. Allowed models: ${allowModelList.join(', ')}`,
        },
        400,
      );
    }

    // Check if custom OpenAI-compatible API is configured
    const BASE_URL = env.AI_GATEWAY_BASE_URL;
    const API_KEY = env.AI_GATEWAY_API_KEY;

    if (BASE_URL && API_KEY) {
      // Use custom OpenAI-compatible API
      const isStream = stream ?? true;
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...extraParams,
          model: MODEL,
          messages,
          stream: isStream,
        }),
      });

      if (!isStream) {
        const data = await response.json();
        return createResponse(data);
      }

      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
  } catch (error: any) {
    return createResponse({
      error: 'Request processing failed',
      details: error.message,
    });
  }
}
