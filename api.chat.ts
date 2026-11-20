import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { aiError, CHAT_MODEL, gateway, isSameOrigin, readJson } from '@/server/ai'

const input = z.object({
  lang: z.enum(['en', 'hi']).default('en'),
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), text: z.string().trim().min(1).max(4000) }))
    .min(1)
    .max(30),
})

const SYSTEM = `You are the IBRAR AI STUDIO assistant, a friendly creative helper for an Indian AI creation platform.
Help users write image prompts, video ideas, scripts, captions and answer general questions.
Reply in the language the user writes in (Hindi in Devanagari, English, or Hinglish). Keep answers concise and well formatted in plain text.`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return Response.json({ error: 'forbidden' }, { status: 403 })
        const parsed = input.safeParse(await readJson(request))
        if (!parsed.success) return Response.json({ error: 'invalid' }, { status: 400 })
        const { messages, lang } = parsed.data
        if (messages.at(-1)?.role !== 'user') return Response.json({ error: 'invalid' }, { status: 400 })

        let stream: AsyncGenerator<{ text?: string }>
        try {
          stream = await gateway().models.generateContentStream({
            model: CHAT_MODEL,
            contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] })),
            config: {
              systemInstruction: `${SYSTEM}\nThe site is currently shown in ${lang === 'hi' ? 'Hindi' : 'English'}.`,
              maxOutputTokens: 1500,
            },
          })
        } catch (err) {
          return aiError(err)
        }

        const encoder = new TextEncoder()
        return new Response(
          new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of stream) {
                  if (chunk.text) controller.enqueue(encoder.encode(chunk.text))
                }
              } catch (err) {
                console.error('Chat stream interrupted', err instanceof Error ? err.message : err)
              }
              controller.close()
            },
          }),
          { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } },
        )
      },
    },
  },
})
