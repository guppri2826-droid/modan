import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={'to-top' + (show ? ' is-shown' : '')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="ऊपर जाएँ"
      tabIndex={show ? 0 : -1}
    >
      <Icon name="arrowUp" size={22} strokeWidth={2.2} />
    </button>
  )
}

// Thin gold bar at the very top showing how far the reader has scrolled.
export function ReadingProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="read-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}
