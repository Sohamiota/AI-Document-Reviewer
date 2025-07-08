import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages, documentContext } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are an AI legal assistant helping users understand and improve their documents. 
    You have access to the document context and can answer questions about clauses, risks, and suggestions.
    
    Document Context: ${documentContext || "No document context provided"}
    
    Provide helpful, accurate legal guidance while noting that users should consult with qualified legal professionals for important decisions.`,
    messages,
  })

  return result.toDataStreamResponse()
}
