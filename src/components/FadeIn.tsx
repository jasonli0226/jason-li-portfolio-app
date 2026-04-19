import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: 0 | 100 | 200 | 300 | 400
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'li'
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  as = 'div',
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (shouldReduceMotion) {
    const Tag = as as 'div'
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  )
}
