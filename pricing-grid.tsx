import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Check, Crown, Info } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useI18n, type TKey } from '@/lib/i18n'
import { plans } from '@/lib/fixtures'
import { cn } from '@/lib/utils'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function PricingGrid() {
  const { t } = useI18n()
  const [yearly, setYearly] = React.useState(false)

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <div className="glass inline-flex rounded-full p-1 text-sm font-medium" role="group" aria-label="Billing period">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              aria-pressed={yearly === y}
              onClick={() => setYearly(y)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 transition-colors',
                yearly === y ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {y ? t('pricing.yearly') : t('pricing.monthly')}
              {y && <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{t('pricing.save')}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const popular = 'popular' in plan && plan.popular
          const price = yearly ? plan.yearly : plan.monthly
          return (
            <div
              key={plan.id}
              className={cn(
                'glass relative flex flex-col rounded-3xl p-6 sm:p-7',
                popular && 'ring-gradient shadow-[0_30px_80px_-30px_rgba(124,58,237,0.7)] lg:-translate-y-3',
              )}
            >
              {popular && (
                <span className="bg-brand absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white">
                  <Crown className="size-3.5" /> {t('pricing.popular')}
                </span>
              )}
              <h3 className="text-xl font-bold">{t(`pricing.${plan.id}.name` as TKey)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`pricing.${plan.id}.desc` as TKey)}</p>
              <p className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold">{inr(price)}</span>
                <span className="pb-1 text-sm text-muted-foreground">{t('pricing.perMonth')}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-violet-400" />
                    {t(f)}
                  </li>
                ))}
              </ul>
              {plan.id === 'free' ? (
                <Button asChild variant="glass" size="xl" className="mt-8">
                  <Link to="/signup">{t('pricing.free.cta')}</Link>
                </Button>
              ) : (
                <Button
                  variant={popular ? 'brand' : 'glass'}
                  size="xl"
                  className="mt-8"
                  onClick={() => toast.info(t('pricing.note'))}
                >
                  {t(`pricing.${plan.id}.cta` as TKey)}
                </Button>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Info className="size-3.5 shrink-0" /> {t('pricing.note')}
      </p>
    </div>
  )
}
