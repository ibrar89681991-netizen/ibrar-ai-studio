import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useI18n, type TKey } from '@/lib/i18n'
import { Logo } from './logo'
import { LanguageToggle } from './language-toggle'

const links: { to: '/' | '/create' | '/dashboard' | '/pricing'; label: TKey }[] = [
  { to: '/', label: 'nav.home' },
  { to: '/create', label: 'nav.create' },
  { to: '/dashboard', label: 'nav.dashboard' },
  { to: '/pricing', label: 'nav.pricing' },
]

export function SiteHeader() {
  const { t } = useI18n()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === '/' }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:bg-accent/60"
            >
              {t(l.label)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">{t('nav.login')}</Link>
          </Button>
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex rounded-full px-4">
            <Link to="/signup">
              <Sparkles /> {t('nav.signup')}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="md:hidden rounded-full" aria-label={t('nav.menu')}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl p-6">
              <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
              <Logo />
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === '/' }}
                    className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground"
                  >
                    {t(l.label)}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <Button asChild variant="glass" size="xl" onClick={() => setOpen(false)}>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild variant="brand" size="xl" onClick={() => setOpen(false)}>
                  <Link to="/signup">{t('nav.signup')}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
