import SYSTEM_PROMPT_FALLBACK from '../chatbot-prompt.txt'
import { detectMentionedArticles } from './_shared/rag.js'
import { queryKnowledgeGraph } from './knowledge-graph.js'

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AI API Key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { messages = [], lang = 'en', currentPage } = await req.json()

    // Truncate overly long user messages
    const rawLastMessage = messages.filter(m => m.role === 'user').pop()?.content || ''
    const lastUserMessage = typeof rawLastMessage === 'string' ? rawLastMessage.slice(0, 2000) : ''

    // Resolve Knowledge Graph entities and RDF triples with <1ms latency
    const kgResult = queryKnowledgeGraph(lastUserMessage)
    const kgContext = kgResult.formatAsContext()

    const brevityInstruction = `CRITICAL RESPONSE FORMAT:
- Speak in first-person as Prakhar Mishra.
- Keep your answers SHORT, PUNCHY, and CONVERSATIONAL (2 to 4 sentences max, 40-75 words) by default.
- Ground all facts, numbers, and scopes strictly in the verified Knowledge Graph below.
- Do NOT output long bulleted essays unless the user explicitly asks for deep technical breakdown.
- Always end with a short, inviting follow-up question.`

    const pageContext = currentPage
      ? `\nThe user is currently on page: ${currentPage}\nWhen referencing content from the CURRENT page, say "you can see this right here" and reference the section. When referencing OTHER articles, mention them by name.`
      : ''

    const systemPrompt = `${SYSTEM_PROMPT_FALLBACK}\n\n${kgContext}\n\n${brevityInstruction}${pageContext}`

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
      })),
    ]

    const encoder = new TextEncoder()
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://prakhar-ai.dev',
              'X-Title': 'Prakhar AI Portfolio',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: formattedMessages,
              stream: true,
              max_tokens: 450,
              temperature: 0.7,
            }),
          })

          if (!openRouterRes.ok) {
            const errorBody = await openRouterRes.text()
            console.error('OpenRouter error:', openRouterRes.status, errorBody)
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  text: "I'm having a brief connection issue. Please feel free to reach out to Prakhar directly at hi@prakhar-ai.dev or via LinkedIn!",
                  replace: true,
                })}\n\n`
              )
            )
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
            return
          }

          const reader = openRouterRes.body.getReader()
          const decoder = new TextDecoder()
          let buffer = ''
          let accumulatedText = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            let newlineIndex

            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
              const line = buffer.slice(0, newlineIndex).trim()
              buffer = buffer.slice(newlineIndex + 1)

              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const json = JSON.parse(line.slice(6))
                  const delta = json.choices?.[0]?.delta?.content
                  if (delta) {
                    accumulatedText += delta
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
                    )
                  }
                } catch (e) {
                  // Ignore JSON parse errors for keepalives
                }
              }
            }
          }

          // Check if any articles were mentioned to send source badges
          const sources = detectMentionedArticles(accumulatedText)
          if (sources && sources.length > 0) {
            controller.enqueue(
              encoder.encode(`event: rag-sources\ndata: ${JSON.stringify(sources)}\n\n`)
            )
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (streamError) {
          console.error('Streaming exception:', streamError)
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                text: "I encountered a momentary glitch. Please try again or reach out to Prakhar at hi@prakhar-ai.dev.",
                replace: true,
              })}\n\n`
            )
          )
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        }
      },
    })

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat endpoint error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
