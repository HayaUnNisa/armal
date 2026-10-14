import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Split-flap ("arrivals board") number: every digit shuffles through random digits,
 * then lands on its value, left to right. Commas and text stay put.
 */
export default function FlapNumber({ value, className = '', trigger }: { value: string; className?: string; trigger?: unknown }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : value.replace(/\d/g, '0'))

  useEffect(() => {
    if (!inView || reduce) { if (reduce) setShown(value); return }
    const chars = value.split('')
    const settle = chars.map((_, i) => 6 + i * 2)
    let tick = 0
    const id = setInterval(() => {
      tick++
      setShown(chars.map((c, i) => (/\d/.test(c) ? (tick >= settle[i] ? c : String((Math.random() * 10) | 0)) : c)).join(''))
      if (tick >= settle[settle.length - 1]) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [inView, value, reduce, trigger])

  return (
    <span ref={ref} className={`inline-flex ${className}`} dir="ltr" aria-label={value}>
      {shown.split('').map((c, i) => (
        <span key={i} aria-hidden="true" className={/\d/.test(c) ? 'inline-block tabular-nums' : 'inline-block whitespace-pre'}>
          {c}
        </span>
      ))}
    </span>
  )
}
