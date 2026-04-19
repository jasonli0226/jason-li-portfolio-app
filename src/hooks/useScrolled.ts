import { useEffect, useState } from 'react'

/**
 * Returns true when window.scrollY exceeds `threshold`.
 * Uses a passive scroll listener. SSR-safe: returns false on the server.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
