import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { aspectRatios, imageStyles } from '@/lib/fixtures'
import { aiError, gateway, IMAGE_MODEL, isSameOrigin, readJson } from '@/server/ai'

const input = z.object({
  prompt: z.string().trim().min(3).max(1500),
  negative: z.string().trim().max(300).optional(),
  style: z.enum(imageStyles as [string, ...string[]]).optional(),
  ratio: z.enum(aspectRatios as [string, ...string[]]).default('1:1'),
})

export const Route = createFileRoute('/api/image')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return Response.json({ error: 'forbidden' }, { status: 403 })
        const parsed = input.safeParse(await readJson(request))
        if (!parsed.success) return Response.json({ error: 'invalid' }, { status: 400 })
        const { prompt, negative, style, ratio } = parsed.data

        const text = [
          `Create an image: ${prompt}`,
          style && `Art style: ${style}.`,
          negative && `Avoid: ${negative}.`,
          'Do not add watermarks.',
        ]
          .filter(Boolean)
          .join('\n')

        try {
          const response = await gateway().models.generateContent({
            model: IMAGE_MODEL,
            contents: text,
            config: { responseModalities: ['IMAGE', 'TEXT'], imageConfig: { aspectRatio: ratio } },
          })
          const parts = response.candidates?.[0]?.content?.parts ?? []
          const image = parts.find((p) => p.inlineData?.data)?.inlineData
          if (!image?.data) {
            // Usually a safety refusal; the model explains in text instead of returning an image.
            return Response.json({ error: 'no-image' }, { status: 422 })
          }
          return Response.json(
            { image: `data:${image.mimeType || 'image/png'};base64,${image.data}`, model: IMAGE_MODEL },
            { headers: { 'Cache-Control': 'no-store' } },
          )
        } catch (err) {
          return aiError(err)
        }
      },
    },
  },
})
