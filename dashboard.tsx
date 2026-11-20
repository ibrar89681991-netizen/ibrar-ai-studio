import { createFileRoute, Link } from '@tanstack/react-router'
import { Crown, FlaskConical, Layers, PlugZap, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useI18n, type TKey } from '@/lib/i18n'
import { cdn, demoActivity, demoUser, demoWeeklyUsage } from '@/lib/fixtures'
import { TOOLS, getTool, toolName } from '@/lib/tools'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/dashboard')({
  head: () => ({ meta: [{ title: 'Dashboard — IBRAR AI STUDIO' }] }),
  component: Dashboard,
})

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function Dashboard() {
  const { t } = useI18n()
  const u = demoUser
  const used = u.dailyCredits - u.creditsLeft
  const max = Math.max(...demoWeeklyUsage)

  return (
    <div className="mx-auto max-w-content px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-sky-400/25 bg-sky-400/5 p-3 text-sm text-sky-100/90">
        <FlaskConical className="size-4 shrink-0 text-sky-300" />
        <strong>{t('dash.demo')}:</strong> {t('dash.demoNote')}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t('dash.welcome')},</p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{u.name} 👋</h1>
          <p className="mt-1 text-muted-foreground">{t('dash.subtitle')}</p>
        </div>
        <Button asChild variant="brand" size="xl">
          <Link to="/pricing">
            <Crown /> {t('dash.upgrade')}
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {t('dash.credits')} <Zap className="size-4 text-amber-300" />
          </div>
          <p className="mt-2 font-display text-4xl font-extrabold">
            {u.creditsLeft}
            <span className="text-lg text-muted-foreground">/{u.dailyCredits}</span>
          </p>
          <Progress value={(used / u.dailyCredits) * 100} className="mt-4 h-2" aria-label={t('dash.planUsage')} />
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {t('dash.creations')} <Layers className="size-4 text-violet-300" />
          </div>
          <p className="mt-2 font-display text-4xl font-extrabold">{u.totalCreations}</p>
        </div>
        <div className="glass ring-gradient rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {t('dash.plan')} <Crown className="size-4 text-sky-300" />
          </div>
          <p className="mt-2 font-display text-4xl font-extrabold text-gradient">{t(`pricing.${u.plan === 'premium' ? 'pro' : u.plan}.name` as TKey)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="glass rounded-3xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">{t('dash.recent')}</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {demoActivity.map((a) => {
              const tool = getTool(a.tool)
              return (
                <li key={a.id} className="flex items-center gap-3 py-3">
                  {a.image ? (
                    <img src={cdn(a.image, 96)} alt="" className="size-12 shrink-0 rounded-xl object-cover" loading="lazy" />
                  ) : (
                    <span className={cn('grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white', tool.gradient)}>
                      <tool.icon className="size-5" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.prompt}</p>
                    <p className="text-xs text-muted-foreground">
                      {t(toolName(a.tool))} · {a.when}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      a.status === 'done' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-300',
                    )}
                  >
                    {a.status === 'done' ? <CheckCircle2 className="size-3" /> : <PlugZap className="size-3" />}
                    <span className="hidden sm:inline">{a.status === 'done' ? t('dash.status.done') : t('dash.status.pending')}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="glass rounded-3xl p-5 sm:p-6">
            <h2 className="text-lg font-bold">{t('dash.usage')}</h2>
            <div className="mt-5 flex h-36 items-end gap-2" role="img" aria-label={`${t('dash.usage')}: ${demoWeeklyUsage.join(', ')}`}>
              {demoWeeklyUsage.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{v}</span>
                  <div className="bg-brand w-full rounded-t-md" style={{ height: `${(v / max) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{days[i]}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="glass rounded-3xl p-5 sm:p-6">
            <h2 className="text-lg font-bold">{t('dash.quick')}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {TOOLS.map((x) => (
                <Link
                  key={x.id}
                  to="/create"
                  search={{ tool: x.id }}
                  className="flex items-center gap-2 rounded-xl border border-border/60 p-2.5 text-xs font-medium transition-colors hover:border-violet-400/50 hover:bg-accent/40"
                >
                  <span className={cn('grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white', x.gradient)}>
                    <x.icon className="size-3.5" />
                  </span>
                  <span className="truncate">{t(toolName(x.id))}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
