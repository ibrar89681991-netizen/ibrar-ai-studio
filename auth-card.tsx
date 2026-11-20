import { Link } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogoMark } from '@/components/site/logo'
import { useI18n } from '@/lib/i18n'

/** Login / signup UI. Not wired to an identity provider yet — see PLAN.md (Netlify Identity). */
export function AuthCard({ mode }: { mode: 'login' | 'signup' }) {
  const { t } = useI18n()
  const isSignup = mode === 'signup'
  const notice = () => toast.info(t('auth.pending'))

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 pt-10 sm:pt-16">
      <div className="glass ring-gradient rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <LogoMark className="mx-auto size-12" />
          <h1 className="mt-4 text-2xl font-bold">{isSignup ? t('auth.signupTitle') : t('auth.loginTitle')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{isSignup ? t('auth.signupSub') : t('auth.loginSub')}</p>
        </div>

        <Button type="button" variant="glass" size="xl" className="mt-6 w-full" onClick={notice}>
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.7 2.3 2.4 6.6 2.4 12s4.3 9.7 9.6 9.7c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
          </svg>
          {t('auth.google')}
        </Button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> {t('auth.or')} <span className="h-px flex-1 bg-border" />
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            notice()
          }}
        >
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input id="name" name="name" autoComplete="name" required className="h-11" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className="h-11" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.password')}</Label>
              {!isSignup && (
                <button type="button" onClick={notice} className="text-xs text-violet-300 hover:underline">
                  {t('auth.forgot')}
                </button>
              )}
            </div>
            <Input id="password" name="password" type="password" minLength={8} autoComplete={isSignup ? 'new-password' : 'current-password'} required className="h-11" />
          </div>
          <Button type="submit" variant="brand" size="xl" className="w-full">
            {isSignup ? t('auth.signup') : t('auth.login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
          <Link to={isSignup ? '/login' : '/signup'} className="font-medium text-violet-300 hover:underline">
            {isSignup ? t('auth.login') : t('auth.signup')}
          </Link>
        </p>
        {isSignup && <p className="mt-3 text-center text-xs text-muted-foreground">{t('auth.terms')}</p>}
      </div>
      <p className="mt-4 flex gap-2 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-3 text-xs text-amber-100/90">
        <Info className="size-4 shrink-0" /> {t('auth.pending')}
      </p>
    </div>
  )
}
