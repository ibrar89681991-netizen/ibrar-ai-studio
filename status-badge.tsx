import { PlugZap, Volume2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import type { ToolStatus } from '@/lib/tools'
import { cn } from '@/lib/utils'

/** Clearly marks whether a tool needs an external AI integration. */
export function StatusBadge({ status, className }: { status: ToolStatus; className?: string }) {
  const { t } = useI18n()
  const needsApi = status === 'needs-api'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        needsApi
          ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
          : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        className,
      )}
    >
      {needsApi ? <PlugZap className="size-3" /> : <Volume2 className="size-3" />}
      {needsApi ? t('status.needsApi') : t('status.browser')}
    </span>
  )
}
