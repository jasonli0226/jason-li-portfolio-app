import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type SectionHeadingProps = {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn('mb-10', align === 'center' && 'text-center', className)}
    >
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-[var(--text-soft)]">
          {description}
        </p>
      )}
    </header>
  )
}
