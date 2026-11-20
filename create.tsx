import { createFileRoute, Link } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { StatusBadge } from '@/components/site/status-badge'
import {
  ChatPanel,
  HindiTtsPanel,
  ImageToVideoPanel,
  PhotoEditPanel,
  TalkingPhotoPanel,
  TextToImagePanel,
  VoicePanel,
} from '@/components/studio/panels'
import { useI18n } from '@/lib/i18n'
import { TOOL_IDS, TOOLS, getTool, toolDesc, toolName, type ToolId } from '@/lib/tools'
import { cn } from '@/lib/utils'

type StudioSearch = { tool?: ToolId; prompt?: string }

export const Route = createFileRoute('/create')({
  validateSearch: (search: Record<string, unknown>): StudioSearch => ({
    tool: TOOL_IDS.includes(search.tool as ToolId) ? (search.tool as ToolId) : undefined,
    prompt: typeof search.prompt === 'string' ? search.prompt.slice(0, 2000) : undefined,
  }),
  head: () => ({ meta: [{ title: 'Creation Studio — IBRAR AI STUDIO' }] }),
  component: Studio,
})

function Studio() {
  const { t } = useI18n()
  const { tool: toolParam, prompt } = Route.useSearch()
  const active: ToolId = toolParam ?? 'text-to-image'
  const tool = getTool(active)

  return (
    <div className="mx-auto max-w-content px-4 pt-8 sm:px-6 sm:pt-12">
      <div>
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient">{t('studio.title')}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">{t('studio.subtitle')}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Tools" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {TOOLS.map((x) => (
            <Link
              key={x.id}
              to="/create"
              search={{ tool: x.id }}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors',
                x.id === active
                  ? 'border-violet-400/50 bg-violet-500/15 text-foreground'
                  : 'border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              )}
            >
              <span className={cn('grid size-8 place-items-center rounded-lg bg-gradient-to-br text-white', x.gradient)}>
                <x.icon className="size-4" />
              </span>
              {t(toolName(x.id))}
            </Link>
          ))}
        </nav>

        <section key={active}>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">{t(toolName(active))}</h2>
            <StatusBadge status={tool.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t(toolDesc(active))}</p>
          <div
            className={cn(
              'mt-4 flex gap-2.5 rounded-2xl border p-3.5 text-sm',
              tool.status === 'needs-api'
                ? 'border-amber-400/25 bg-amber-400/5 text-amber-100/90'
                : 'border-emerald-400/25 bg-emerald-400/5 text-emerald-100/90',
            )}
          >
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>{tool.status === 'needs-api' ? t('status.needsApi.long') : t('status.browser.long')}</p>
          </div>
          <div className="mt-6">
            {active === 'text-to-image' && <TextToImagePanel initialPrompt={prompt} />}
            {active === 'image-to-video' && <ImageToVideoPanel initialPrompt={prompt} />}
            {active === 'photo-edit' && <PhotoEditPanel />}
            {active === 'talking-photo' && <TalkingPhotoPanel initialPrompt={prompt} />}
            {active === 'voice' && <VoicePanel initialPrompt={prompt} />}
            {active === 'chat' && <ChatPanel initialPrompt={prompt} />}
            {active === 'hindi-tts' && <HindiTtsPanel initialPrompt={prompt} />}
          </div>
        </section>
      </div>
    </div>
  )
}
