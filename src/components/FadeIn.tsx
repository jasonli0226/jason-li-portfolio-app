import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: 0 | 100 | 200 | 300 | 400
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'li'
  className?: string
}

const DELAY_CLASS: Record<number, string> = {
  0: 'delay-0',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
}

export default function FadeIn({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref as any}
      className={cn(
        'transition-all duration-500 ease-out',
        DELAY_CLASS[delay],
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
