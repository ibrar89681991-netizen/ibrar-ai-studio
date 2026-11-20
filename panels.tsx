import * as React from 'react'
import { ImageUp, PlugZap, Send, Sparkles, Square, Volume2, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { LogoMark } from '@/components/site/logo'
import { useI18n, type TKey } from '@/lib/i18n'
import { aspectRatios, imageStyles } from '@/lib/fixtures'
import { getTool, type ToolId } from '@/lib/tools'
import { cn } from '@/lib/utils'

/* ---------- shared bits ---------- */

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
            value === o
              ? 'border-violet-400/70 bg-violet-500/20 text-foreground'
              : 'border-border text-muted-foreground hover:text-foreground',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function UploadBox({ label }: { label: string }) {
  const { t } = useI18n()
  const [preview, setPreview] = React.useState<string | null>(null)
  const inputId = React.useId()

  React.useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  return (
    <Field label={label} htmlFor={inputId}>
      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img src={preview} alt="" className="max-h-64 w-full object-contain bg-black/30" />
          <Button type="button" size="icon-sm" variant="glass" className="absolute right-2 top-2 rounded-full" onClick={() => setPreview(null)} aria-label="Remove">
            <X />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-10 text-center transition-colors hover:border-violet-400/60"
        >
          <ImageUp className="size-8 text-violet-400" />
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{t('studio.uploadHint')}</span>
        </label>
      )}
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          if (file.size > 10 * 1024 * 1024) return toast.error(t('studio.uploadHint'))
          setPreview(URL.createObjectURL(file))
        }}
      />
    </Field>
  )
}

/** Output panel — never shows fabricated results for tools that need an AI API. */
function OutputPanel({ submitted }: { submitted: boolean }) {
  const { t } = useI18n()
  return (
    <div className="glass flex min-h-72 flex-col items-center justify-center rounded-3xl p-6 text-center">
      {submitted ? (
        <>
          <span className="grid size-14 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
            <PlugZap className="size-7" />
          </span>
          <h3 className="mt-4 font-semibold">{t('studio.pendingTitle')}</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t('studio.queued')}</p>
        </>
      ) : (
        <>
          <LogoMark className="size-14 opacity-60 animate-float" />
          <p className="mt-4 text-sm text-muted-foreground">{t('studio.emptyOutput')}</p>
        </>
      )}
    </div>
  )
}

function GenerateForm({ tool, children }: { tool: ToolId; children: React.ReactNode }) {
  const { t } = useI18n()
  const [submitted, setSubmitted] = React.useState(false)
  const { cost } = getTool(tool)
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form
        className="glass space-y-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
          toast.warning(t('studio.pendingTitle'), { description: t('studio.queued') })
        }}
      >
        {children}
        <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-5">
          <span className="text-sm text-muted-foreground">
            {t('studio.cost')}: <strong className="text-foreground">{cost}</strong> {t('studio.credits')}
          </span>
          <Button type="submit" variant="brand" size="xl">
            <Sparkles /> {t('studio.generate')}
          </Button>
        </div>
      </form>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('studio.output')}</h3>
        <OutputPanel submitted={submitted} />
      </div>
    </div>
  )
}

/* ---------- panels ---------- */

export function TextToImagePanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [style, setStyle] = React.useState(imageStyles[0])
  const [ratio, setRatio] = React.useState(aspectRatios[0])
  return (
    <GenerateForm tool="text-to-image">
      <Field label={t('studio.prompt')} htmlFor="tti-prompt">
        <Textarea id="tti-prompt" required rows={4} defaultValue={initialPrompt} placeholder={t('hero.placeholder')} />
      </Field>
      <Field label={t('studio.negative')} htmlFor="tti-neg">
        <Input id="tti-neg" placeholder="blurry, low quality, text" />
      </Field>
      <Field label={t('studio.style')}>
        <Chips options={imageStyles} value={style} onChange={setStyle} label={t('studio.style')} />
      </Field>
      <Field label={t('studio.ratio')}>
        <Chips options={aspectRatios} value={ratio} onChange={setRatio} label={t('studio.ratio')} />
      </Field>
    </GenerateForm>
  )
}

export function ImageToVideoPanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [motion, setMotion] = React.useState('Slow zoom')
  const [duration, setDuration] = React.useState('5s')
  return (
    <GenerateForm tool="image-to-video">
      <UploadBox label={t('studio.upload')} />
      <Field label={t('studio.prompt')} htmlFor="itv-prompt">
        <Textarea id="itv-prompt" rows={3} defaultValue={initialPrompt} placeholder="Camera slowly pushes in, clouds drift…" />
      </Field>
      <Field label={t('studio.motion')}>
        <Chips options={['Slow zoom', 'Pan left', 'Orbit', 'Dolly in', 'Handheld']} value={motion} onChange={setMotion} label={t('studio.motion')} />
      </Field>
      <Field label={t('studio.duration')}>
        <Chips options={['5s', '10s']} value={duration} onChange={setDuration} label={t('studio.duration')} />
      </Field>
    </GenerateForm>
  )
}

export function PhotoEditPanel() {
  const { t } = useI18n()
  const [action, setAction] = React.useState('Remove background')
  return (
    <GenerateForm tool="photo-edit">
      <UploadBox label={t('studio.upload')} />
      <Field label={t('studio.editAction')}>
        <Chips
          options={['Remove background', 'Enhance face', 'Restore old photo', 'Upscale 4×', 'Magic eraser', 'Change sky']}
          value={action}
          onChange={setAction}
          label={t('studio.editAction')}
        />
      </Field>
    </GenerateForm>
  )
}

export function TalkingPhotoPanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [voice, setVoice] = React.useState('Aarav (Hindi)')
  return (
    <GenerateForm tool="talking-photo">
      <UploadBox label={t('studio.uploadPortrait')} />
      <Field label={t('studio.script')} htmlFor="tp-script">
        <Textarea id="tp-script" required rows={3} defaultValue={initialPrompt} placeholder={t('studio.scriptPlaceholder')} />
      </Field>
      <Field label={t('studio.voice')}>
        <Chips options={['Aarav (Hindi)', 'Meera (Hindi)', 'James (English)', 'Ava (English)']} value={voice} onChange={setVoice} label={t('studio.voice')} />
      </Field>
    </GenerateForm>
  )
}

export function VoicePanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [voice, setVoice] = React.useState('Narrator')
  return (
    <GenerateForm tool="voice">
      <Field label={t('studio.text')} htmlFor="vg-text">
        <Textarea id="vg-text" required rows={5} defaultValue={initialPrompt} placeholder={t('studio.voicePlaceholder')} />
      </Field>
      <Field label={t('studio.voice')}>
        <Chips options={['Narrator', 'Energetic', 'Calm', 'News anchor', 'Storyteller']} value={voice} onChange={setVoice} label={t('studio.voice')} />
      </Field>
    </GenerateForm>
  )
}

/** Hindi TTS works today via the browser's Web Speech API (no key, nothing leaves the device). */
export function HindiTtsPanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [text, setText] = React.useState(initialPrompt || t('studio.ttsPlaceholder'))
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [voiceURI, setVoiceURI] = React.useState('')
  const [rate, setRate] = React.useState(1)
  const [pitch, setPitch] = React.useState(1)
  const [speaking, setSpeaking] = React.useState(false)
  const [supported, setSupported] = React.useState(true)

  React.useEffect(() => {
    if (!('speechSynthesis' in window)) return setSupported(false)
    const load = () => {
      const hiVoices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('hi'))
      setVoices(hiVoices)
      setVoiceURI((cur) => cur || hiVoices[0]?.voiceURI || '')
    }
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load)
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = () => {
    if (!text.trim()) return
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'hi-IN'
    const v = voices.find((x) => x.voiceURI === voiceURI)
    if (v) u.voice = v
    u.rate = rate
    u.pitch = pitch
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    synth.speak(u)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="glass space-y-6 rounded-3xl p-5 sm:p-6">
        <Field label={t('studio.text')} htmlFor="tts-text">
          <Textarea id="tts-text" lang="hi" rows={6} value={text} onChange={(e) => setText(e.target.value)} className="text-lg" />
        </Field>
        {voices.length > 0 ? (
          <Field label={t('studio.voice')} htmlFor="tts-voice">
            <select
              id="tts-voice"
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">{t('studio.noVoices')}</p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <Range label={t('studio.speed')} value={rate} onChange={setRate} />
          <Range label={t('studio.pitch')} value={pitch} onChange={setPitch} />
        </div>
        <div className="flex justify-end gap-2 border-t border-border/60 pt-5">
          {speaking && (
            <Button variant="glass" size="xl" onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false) }}>
              <Square /> {t('studio.stop')}
            </Button>
          )}
          <Button variant="brand" size="xl" onClick={speak} disabled={!supported}>
            <Volume2 /> {t('studio.speak')}
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('studio.output')}</h3>
        <div className="glass flex min-h-72 flex-col items-center justify-center rounded-3xl p-6 text-center">
          <div className="flex h-16 items-end gap-1" aria-hidden>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={cn('w-1.5 rounded-full bg-gradient-to-t from-violet-500 to-sky-400 transition-all', speaking ? 'animate-pulse' : 'opacity-40')}
                style={{ height: `${speaking ? 20 + ((i * 37) % 80) : 12 + ((i * 13) % 20)}%`, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">{t('status.browser.long')}</p>
        </div>
      </div>
    </div>
  )
}

function Range({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const id = React.useId()
  return (
    <Field label={`${label} · ${value.toFixed(1)}×`} htmlFor={id}>
      <input id={id} type="range" min={0.5} max={1.5} step={0.1} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-violet-500" />
    </Field>
  )
}

type Msg = { role: 'user' | 'assistant'; text: string; pending?: boolean }

export function ChatPanel({ initialPrompt }: { initialPrompt?: string }) {
  const { t } = useI18n()
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState(initialPrompt ?? '')
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), [messages])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: 'studio.chatPending', pending: true }])
    setInput('')
  }

  const all: Msg[] = [{ role: 'assistant', text: 'studio.chatWelcome' }, ...messages]

  return (
    <div className="glass flex h-[min(70dvh,640px)] flex-col overflow-hidden rounded-3xl">
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {all.map((m, i) => (
          <div key={i} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
            {m.role === 'assistant' && <LogoMark className="size-8 shrink-0" />}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'user' ? 'bg-brand text-white rounded-tr-sm' : 'bg-muted rounded-tl-sm',
                m.pending && 'border border-amber-400/30 bg-amber-400/10 text-amber-100',
              )}
            >
              {m.pending && <PlugZap className="mb-1 size-4 text-amber-300" />}
              {m.role === 'assistant' ? t(m.text as TKey) : m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-border/60 p-3 sm:p-4">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('studio.chatPlaceholder')} className="h-12 rounded-xl" aria-label={t('studio.chatPlaceholder')} />
        <Button type="submit" variant="brand" size="icon-lg" className="size-12 rounded-xl" aria-label={t('studio.send')}>
          <Send />
        </Button>
      </form>
    </div>
  )
}
