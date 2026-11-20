import { createFileRoute } from '@tanstack/react-router'
import { AuthCard } from '@/components/auth/auth-card'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Log in — IBRAR AI STUDIO' }] }),
  component: () => <AuthCard mode="login" />,
})
