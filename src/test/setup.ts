import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
  trigger(entries: Array<Partial<IntersectionObserverEntry>>) {
    this.callback(
      entries as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver,
    )
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
