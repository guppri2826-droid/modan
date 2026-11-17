import { useEffect, useState } from 'react'
import { Link } from '../router.jsx'
import { Logo } from './Ornament.jsx'
import { CLUB_NAME, CLUB_NAME_EN } from '../content/club.js'

const NAV = [
  { to: '/', label: 'मुख्य पृष्ठ', match: '' },
  { to: '/uddeshya', label: 'उद्देश्य एवं संरचना', match: 'uddeshya' },
  { to: '/sadasyata', label: 'सदस्यता', match: 'sadasyata' },
  { to: '/itihas', label: 'इतिहास एवं संस्कार', match: 'itihas' },
]

export default function Header({ section }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [section])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={CLUB_NAME}>
          <Logo size={46} />
          <span className="brand-text">
            <span className="brand-name">{CLUB_NAME}</span>
            <span className="brand-en">{CLUB_NAME_EN}</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">मेनू</span>
          <span className={'burger' + (open ? ' is-open' : '')} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav id="main-nav" className={'main-nav' + (open ? ' is-open' : '')}>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={'nav-link' + (section === item.match ? ' is-active' : '')}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/aavedan" className="btn btn-primary nav-cta">
            आवेदन करें
          </Link>
        </nav>
      </div>
    </header>
  )
}
