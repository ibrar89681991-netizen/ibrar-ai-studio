import { GoogleGenAI } from '@google/genai'

export const CHAT_MODEL = 'gemini-3.5-flash'
export const IMAGE_MODEL = 'gemini-3.1-flash-image'

let client: GoogleGenAI | undefined

export function gateway() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  client ??= new GoogleGenAI({ apiKey })
  return client
}

/** Reject cross-site browser requests. */
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

/** Safe user-facing AI errors. */
export function aiError(err: unknown) {
  const status =
    typeof err === 'object' && err && 'status' in err
      ? Number((err as { status: unknown }).status)
      : 0

  console.error(
    'Gemini API request failed',
    status,
    err instanceof Error ? err.message : err,
  )

  if (status === 429) {
    return Response.json({ error: 'busy' }, { status: 429 })
  }

  if (status === 401 || status === 403) {
    return Response.json({ error: 'unavailable' }, { status: 503 })
  }

  return Response.json({ error: 'failed' }, { status: 502 })
}
