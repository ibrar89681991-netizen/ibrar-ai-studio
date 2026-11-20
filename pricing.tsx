import { createFileRoute } from '@tanstack/react-router'
import { PricingGrid } from '@/components/site/pricing-grid'
import { useI18n } from '@/lib/i18n'

export const Route = createFileRoute('/pricing')({
  head: () => ({ meta: [{ title: 'Pricing — IBRAR AI STUDIO' }] }),
  component: PricingPage,
})

function PricingPage() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-content px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          <span className="text-gradient">{t('pricing.title')}</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t('pricing.subtitle')}</p>
      </div>
      <PricingGrid />
    </section>
  )
}
