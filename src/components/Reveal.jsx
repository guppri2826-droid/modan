import { useEffect, useRef, useState } from 'react'

// Shared "has this scrolled into view yet?" hook.
function useInView(options = { rootMargin: '0px 0px -8% 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}

// Fades/slides its content in the first time it scrolls into view.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Counts a number up from 0 once visible. Non-numbers render unchanged.
export function CountUp({ value, suffix = '', duration = 1200 }) {
  const [ref, inView] = useInView({ rootMargin: '0px' })
  const [n, setN] = useState(typeof value === 'number' ? 0 : value)

  useEffect(() => {
    if (!inView || typeof value !== 'number') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(value)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
