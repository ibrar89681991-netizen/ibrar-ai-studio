import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div role="group" aria-label="Language" className={cn('glass flex rounded-full p-0.5 text-xs font-semibold', className)}>
      {(['en', 'hi'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'rounded-full px-3 py-1.5 transition-colors',
            lang === l ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {l === 'en' ? 'EN' : 'हिं'}
        </button>
      ))}
    </div>
  )
}
