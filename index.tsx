import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  Download,
  PenLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StatusBadge } from '@/components/site/status-badge'
import { PricingGrid } from '@/components/site/pricing-grid'
import { useI18n, type TKey } from '@/lib/i18n'
import { TOOLS, toolDesc, toolName, type ToolId } from '@/lib/tools'
import { cdn, promptIdeas, showcase } from '@/lib/fixtures'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <ToolsSection />
      <Gallery />
      <HowItWorks />
      <section id="pricing" className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <PricingHeading />
        <PricingGrid />
      </section>
      <Faq />
      <FinalCta />
    </>
  )
}

function Hero() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const [prompt, setPrompt] = React.useState('')
  const [tool, setTool] = React.useState<ToolId>('text-to-image')
  const quickTools: ToolId[] = ['text-to-image', 'image-to-video', 'talking-photo', 'voice', 'hindi-tts']

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ to: '/create', search: { tool, prompt: prompt.trim() || undefined } })
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-content px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20 md:pb-24">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-violet-400" />
          {t('hero.badge')}
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] sm:text-6xl md:text-7xl">
          {t('hero.title1')}
          <br />
          <span className="text-gradient">{t('hero.title2')}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>

        <form
          onSubmit={submit}
          className="glass ring-gradient mx-auto mt-10 max-w-3xl rounded-3xl p-3 text-left shadow-[0_30px_80px_-30px_rgba(124,58,237,0.6)] sm:p-4"
        >
          <label htmlFor="hero-prompt" className="sr-only">
            {t('studio.prompt')}
          </label>
          <textarea
            id="hero-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            rows={3}
            placeholder={t('hero.placeholder')}
            className="w-full resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground/70 sm:text-lg"
          />
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:pb-0" role="radiogroup" aria-label={t('hero.selectTool')}>
              {quickTools.map((id) => {
                const Icon = TOOLS.find((x) => x.id === id)!.icon
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={tool === id}
                    onClick={() => setTool(id)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      tool === id
                        ? 'border-violet-400/60 bg-violet-500/20 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Icon className="size-3.5" />
                    {t(toolName(id))}
                  </button>
                )
              })}
            </div>
            <Button type="submit" variant="brand" size="xl" className="sm:ml-auto">
              <Sparkles /> {t('hero.cta')}
            </Button>
          </div>
        </form>

        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>{t('hero.try')}</span>
          {promptIdeas[lang].map((idea) => (
            <button
              key={idea}
              type="button"
              onClick={() => setPrompt(idea)}
              className="rounded-full border border-border/70 px-3 py-1 transition-colors hover:border-violet-400/60 hover:text-foreground"
            >
              {idea}
            </button>
          ))}
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {(
            [
              ['7', 'hero.stat1'],
              ['2', 'hero.stat2'],
              ['10', 'hero.stat3'],
            ] as [string, TKey][]
          ).map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{t(label)}</dt>
              <dd className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">{n}</dd>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{t(label)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

function ToolsSection() {
  const { t } = useI18n()
  return (
    <section id="tools" className="mx-auto max-w-content scroll-mt-20 px-4 sm:px-6">
      <SectionHeading title={t('tools.title')} subtitle={t('tools.subtitle')} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool, i) => (
          <Link
            key={tool.id}
            to="/create"
            search={{ tool: tool.id }}
            className={cn(
              'glass group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_20px_50px_-20px_rgba(124,58,237,0.6)]',
              i === 0 && 'lg:col-span-2',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className={cn('grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg', tool.gradient)}>
                <tool.icon className="size-5" />
              </span>
              <StatusBadge status={tool.status} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{t(toolName(tool.id))}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{t(toolDesc(tool.id))}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-300">
              {t('tools.open')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
        <div className="glass flex flex-col justify-center rounded-2xl p-5">
          <ShieldCheck className="size-8 text-sky-400" />
          <h3 className="mt-4 text-lg font-semibold">{t('security.title')}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{t('security.desc')}</p>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
      <SectionHeading title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {showcase.map((item, i) => (
          <figure
            key={item.src}
            className={cn('group relative overflow-hidden rounded-2xl border border-border/60', i % 2 === 1 && 'lg:translate-y-8')}
          >
            <img
              src={cdn(item.src, 600)}
              srcSet={`${cdn(item.src, 400)} 400w, ${cdn(item.src, 800)} 800w`}
              sizes="(min-width: 1024px) 25vw, 50vw"
              alt={item.prompt}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10 text-left">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                {t('gallery.label')}
              </span>
              <p className="mt-1.5 line-clamp-2 text-xs text-white/90 sm:text-sm">“{item.prompt}”</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const { t } = useI18n()
  const steps = [
    { icon: PenLine, title: 'how.1.title', desc: 'how.1.desc' },
    { icon: SlidersHorizontal, title: 'how.2.title', desc: 'how.2.desc' },
    { icon: Download, title: 'how.3.title', desc: 'how.3.desc' },
  ] as const
  return (
    <section className="mx-auto max-w-content px-4 pt-28 sm:px-6">
      <SectionHeading title={t('how.title')} />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="glass relative rounded-2xl p-6">
            <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/5">0{i + 1}</span>
            <span className="bg-brand grid size-11 place-items-center rounded-xl text-white">
              <s.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{t(s.title)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t(s.desc)}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function PricingHeading() {
  const { t } = useI18n()
  return <SectionHeading title={t('pricing.title')} subtitle={t('pricing.subtitle')} />
}

function Faq() {
  const { t } = useI18n()
  const items = [1, 2, 3, 4] as const
  return (
    <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
      <SectionHeading title={t('faq.title')} />
      <Accordion type="single" collapsible className="mt-8">
        {items.map((n) => (
          <AccordionItem key={n} value={`q${n}`} className="border-border/60">
            <AccordionTrigger className="text-left text-base">{t(`faq.${n}.q` as TKey)}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{t(`faq.${n}.a` as TKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

function FinalCta() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
      <div className="bg-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white">
        <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{t('cta.desc')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" className="bg-white text-violet-700 hover:bg-white/90">
              <Link to="/signup">
                <Sparkles /> {t('pricing.free.cta')}
              </Link>
            </Button>
            <Button asChild size="xl" variant="ghost" className="border border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link to="/create">{t('hero.explore')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
