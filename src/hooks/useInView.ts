import { useCallback, useEffect, useRef, useState } from 'react'

export type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [(node: T | null) => void, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const [inView, setInView] = useState(false)
  const elementRef = useRef<T | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    elementRef.current = node
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        },
        { threshold, rootMargin },
      )
      observer.observe(node)
      observerRef.current = observer
    }
  }, [threshold, rootMargin, once])

  useEffect(() => () => observerRef.current?.disconnect(), [])

  return [setRef, inView]
}
