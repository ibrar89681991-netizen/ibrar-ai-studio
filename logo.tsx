import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('size-9', className)} aria-hidden="true">
      <defs>
        <linearGradient id="ibrar-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#ibrar-g)" />
      <path d="M8 31 L20 8 L32 31" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 23.5 H26.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="31" cy="10" r="3" fill="white" />
      <path d="M31 4.5v2M31 13.5v2M25.5 10h2M34.5 10h2" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 shrink-0', className)} aria-label="IBRAR AI STUDIO home">
      <LogoMark />
      <span className="font-display leading-none">
        <span className="block text-[15px] font-extrabold tracking-wide">IBRAR</span>
        <span className="block text-[10px] font-semibold tracking-[0.28em] text-gradient">AI STUDIO</span>
      </span>
    </Link>
  )
}
