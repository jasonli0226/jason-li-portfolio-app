import { describe, it, expect } from 'vitest'

describe('test setup', () => {
  it('jsdom is available', () => {
    expect(typeof document).toBe('object')
  })

  it('IntersectionObserver mock is installed', () => {
    expect(typeof IntersectionObserver).toBe('function')
  })
})
