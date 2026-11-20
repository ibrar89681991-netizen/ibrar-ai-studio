import { Link } from '@tanstack/react-router'
import { useI18n } from '@/lib/i18n'
import { TOOLS, toolName } from '@/lib/tools'
import { Logo } from './logo'

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t('footer.tagline')}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t('footer.product')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {TOOLS.slice(0, 5).map((tool) => (
              <li key={tool.id}>
                <Link to="/create" search={{ tool: tool.id }} className="hover:text-foreground">
                  {t(toolName(tool.id))}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t('footer.company')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">{t('nav.pricing')}</Link></li>
            <li><span>{t('footer.about')}</span></li>
            <li><span>{t('footer.privacy')}</span></li>
            <li><span>{t('footer.terms')}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} IBRAR AI STUDIO. {t('footer.rights')}
      </div>
    </footer>
  )
}
