import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const BLOBS = [
  {
    token: 'var(--aurora-blob-1)',
    animation: 'aurora-drift-a 22s ease-in-out infinite',
    style: { top: '-10%', left: '-10%', width: '52%', height: '55%' },
    parallax: 0.08,
  },
  {
    token: 'var(--aurora-blob-2)',
    animation: 'aurora-drift-b 26s ease-in-out infinite',
    style: { top: '-5%', right: '-15%', width: '50%', height: '60%' },
    parallax: 0.12,
  },
  {
    token: 'var(--aurora-blob-3)',
    animation: 'aurora-drift-c 30s ease-in-out infinite',
    style: { top: '30%', left: '20%', width: '45%', height: '45%' },
    parallax: 0.06,
  },
  {
    token: 'var(--aurora-blob-4)',
    animation: 'aurora-drift-d 24s ease-in-out infinite',
    style: { bottom: '-20%', right: '5%', width: '55%', height: '55%' },
    parallax: 0.15,
  },
  {
    token: 'var(--aurora-blob-5)',
    animation: 'aurora-drift-e 28s ease-in-out infinite',
    style: { bottom: '-10%', left: '-5%', width: '40%', height: '45%' },
    parallax: 0.1,
  },
] as const

export default function AuroraBackdrop() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // One hook call per blob, in a fixed order — complies with Rules of Hooks.
  const y0 = useTransform(scrollY, (v) => v * BLOBS[0].parallax)
  const y1 = useTransform(scrollY, (v) => v * BLOBS[1].parallax)
  const y2 = useTransform(scrollY, (v) => v * BLOBS[2].parallax)
  const y3 = useTransform(scrollY, (v) => v * BLOBS[3].parallax)
  const y4 = useTransform(scrollY, (v) => v * BLOBS[4].parallax)
  const yValues = [y0, y1, y2, y3, y4]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="aurora-blob"
          style={{
            ...blob.style,
            background: blob.token,
            animation: shouldReduceMotion ? 'none' : blob.animation,
            y: shouldReduceMotion ? 0 : yValues[i],
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, var(--aurora-wash), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--aurora-noise-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
