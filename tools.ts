import {
  AudioLines,
  Clapperboard,
  ImagePlus,
  Languages,
  MessageSquareText,
  ScanFace,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import type { TKey } from './i18n'

export const TOOL_IDS = [
  'text-to-image',
  'image-to-video',
  'photo-edit',
  'talking-photo',
  'voice',
  'chat',
  'hindi-tts',
] as const

export type ToolId = (typeof TOOL_IDS)[number]

/**
 * `needs-api`: UI is complete, but real output requires a server-side AI integration (see PLAN.md).
 * `browser`: works today using the device's built-in Web Speech engine.
 */
export type ToolStatus = 'needs-api' | 'browser'

export type Tool = {
  id: ToolId
  icon: LucideIcon
  status: ToolStatus
  /** Credit cost per generation (used for future billing). */
  cost: number
  gradient: string
}

export const TOOLS: Tool[] = [
  { id: 'text-to-image', icon: ImagePlus, status: 'needs-api', cost: 1, gradient: 'from-violet-500 to-indigo-500' },
  { id: 'image-to-video', icon: Clapperboard, status: 'needs-api', cost: 5, gradient: 'from-indigo-500 to-blue-500' },
  { id: 'photo-edit', icon: Wand2, status: 'needs-api', cost: 1, gradient: 'from-fuchsia-500 to-violet-500' },
  { id: 'talking-photo', icon: ScanFace, status: 'needs-api', cost: 4, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'voice', icon: AudioLines, status: 'needs-api', cost: 1, gradient: 'from-purple-500 to-pink-500' },
  { id: 'chat', icon: MessageSquareText, status: 'needs-api', cost: 0, gradient: 'from-sky-500 to-indigo-500' },
  { id: 'hindi-tts', icon: Languages, status: 'browser', cost: 0, gradient: 'from-orange-400 to-fuchsia-500' },
]

export const toolName = (id: ToolId) => `tool.${id}` as TKey
export const toolDesc = (id: ToolId) => `tool.${id}.desc` as TKey
export const getTool = (id: ToolId) => TOOLS.find((t) => t.id === id)!
