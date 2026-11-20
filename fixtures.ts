/**
 * Stubbed data for the product surface. Every value here is sample data.
 * Replace these with real queries (Netlify Database) once accounts and
 * generation history are implemented — see PLAN.md.
 */
import type { ToolId } from './tools'

export const demoUser = {
  name: 'Ibrar Khan',
  email: 'creator@example.com',
  plan: 'free' as 'free' | 'premium' | 'studio',
  creditsLeft: 7,
  dailyCredits: 10,
  totalCreations: 48,
}

export type Activity = {
  id: string
  tool: ToolId
  prompt: string
  when: string
  status: 'done' | 'pending'
  image?: string
}

export const demoActivity: Activity[] = [
  { id: 'a1', tool: 'text-to-image', prompt: 'Futuristic Mumbai skyline in neon rain', when: '2h', status: 'pending', image: '/img/showcase-city.png' },
  { id: 'a2', tool: 'hindi-tts', prompt: 'नमस्ते दोस्तों, आज की वीडियो में…', when: '5h', status: 'done' },
  { id: 'a3', tool: 'talking-photo', prompt: 'Grandfather portrait – birthday wish', when: '1d', status: 'pending', image: '/img/showcase-portrait.png' },
  { id: 'a4', tool: 'image-to-video', prompt: 'Temple in clouds, slow zoom', when: '2d', status: 'pending', image: '/img/showcase-temple.png' },
  { id: 'a5', tool: 'chat', prompt: 'Write 5 Instagram captions for Diwali sale', when: '3d', status: 'pending' },
]

/** Credits spent per day, Mon → Sun. */
export const demoWeeklyUsage = [4, 7, 3, 9, 6, 10, 3]

export const showcase = [
  { src: '/img/showcase-city.png', prompt: 'Futuristic Indian city at night, neon rain' },
  { src: '/img/showcase-portrait.png', prompt: 'Portrait woven from cosmic light' },
  { src: '/img/showcase-temple.png', prompt: 'Ancient temple floating among clouds' },
  { src: '/img/showcase-tiger.png', prompt: 'Bioluminescent Bengal tiger in misty jungle' },
]

export const promptIdeas = {
  en: ['Royal peacock in gold', 'Anime girl in Jaipur', 'Cyberpunk chai stall', 'Watercolor Himalayas'],
  hi: ['सोने का शाही मोर', 'जयपुर में एनीमे लड़की', 'साइबरपंक चाय की दुकान', 'वॉटरकलर हिमालय'],
}

export const imageStyles = ['Cinematic', 'Anime', 'Realistic', '3D Render', 'Watercolor', 'Bollywood Poster']
export const aspectRatios = ['1:1', '9:16', '16:9', '4:5']

/** Plans in INR. Prices are placeholders until payments are connected. */
export const plans = [
  { id: 'free', monthly: 0, yearly: 0, features: ['pricing.f.credits10', 'pricing.f.allTools', 'pricing.f.sd', 'pricing.f.watermark', 'pricing.f.chat'] },
  { id: 'pro', monthly: 499, yearly: 399, popular: true, features: ['pricing.f.credits1000', 'pricing.f.allTools', 'pricing.f.hd', 'pricing.f.noWatermark', 'pricing.f.priority', 'pricing.f.voices'] },
  { id: 'studio', monthly: 1999, yearly: 1599, features: ['pricing.f.credits5000', 'pricing.f.seats', 'pricing.f.commercial', 'pricing.f.api', 'pricing.f.support'] },
] as const

/** Image CDN helper — never ship full-resolution originals. */
export const cdn = (src: string, w: number) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&fm=webp&q=75`
