import { GoogleGenAI } from '@google/genai'

/**
 * Server-only AI Gateway helpers. Never import this file from client code.
 * Netlify AI Gateway injects NETLIFY_AI_GATEWAY_KEY / NETLIFY_AI_GATEWAY_URL at runtime,
 * so no provider key is stored in the repo or sent to the browser.
 */

export const CHAT_MODEL = 'gemini-3.5-flash'
export const IMAGE_MODEL = 'gemini-3.1-flash-image'

let client: GoogleGenAI | undefined

export function gateway() {
  client ??= new GoogleGenAI({
    apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
    httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_URL?.replace(/\/$/, '') },
  })
  return client
}

/** Rejects cross-site browser requests so other sites can't spend this project's AI credits. */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site'
  try {
    return new URL(origin).host === new URL(request.url).host
  } catch {
    return false
  }
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return undefined
  }
}

/** Maps provider failures to safe, user-facing errors (no upstream details leak). */
export function aiError(err: unknown) {
  const status = typeof err === 'object' && err && 'status' in err ? Number((err as { status: unknown }).status) : 0
  console.error('AI Gateway request failed', status, err instanceof Error ? err.message : err)
  if (status === 429) return Response.json({ error: 'busy' }, { status: 429 })
  if (status === 401 || status === 403) return Response.json({ error: 'unavailable' }, { status: 503 })
  return Response.json({ error: 'failed' }, { status: 502 })
}
