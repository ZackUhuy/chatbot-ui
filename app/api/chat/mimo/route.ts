import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: {
      model: string
      temperature: number
    }
    messages: any[]
  }

  try {
    const apiKey = process.env.MIMO_API_KEY || ""
    const baseURL =
      process.env.MIMO_BASE_URL || "https://token-plan-sgp.xiaomimimo.com/v1"

    if (!apiKey) {
      throw new Error(
        "MIMO API Key not found. Please set it in your environment variables."
      )
    }

    const client = new OpenAI({
      apiKey,
      baseURL
    })

    const response = await client.chat.completions.create({
      model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
      messages: messages as ChatCompletionCreateParamsBase["messages"],
      temperature: chatSettings.temperature,
      stream: true
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
