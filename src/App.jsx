import { useEffect } from 'react'
import { useRoute } from './router.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Membership from './pages/Membership.jsx'
import Apply from './pages/Apply.jsx'
import { HistoryIndex, HistoryChapter } from './pages/History.jsx'
import NotFound from './pages/NotFound.jsx'
import BackToTop from './components/BackToTop.jsx'
import { CLUB_NAME } from './content/club.js'

const TITLES = {
  '': CLUB_NAME,
  uddeshya: 'उद्देश्य एवं संरचना',
  sadasyata: 'सदस्यता',
  aavedan: 'सदस्यता आवेदन पत्र',
  itihas: 'इतिहास एवं संस्कार',
}

export default function App() {
  const { parts } = useRoute()
  const section = parts[0] || ''

  useEffect(() => {
    const t = TITLES[section]
    document.title = t && section ? `${t} · ${CLUB_NAME}` : CLUB_NAME
  }, [section])

  let page
  switch (section) {
    case '':
      page = <Home />
      break
    case 'uddeshya':
      page = <About />
      break
    case 'sadasyata':
      page = <Membership />
      break
    case 'aavedan':
      page = <Apply />
      break
    case 'itihas':
      page = parts[1] ? <HistoryChapter id={parts[1]} /> : <HistoryIndex />
      break
    default:
      page = <NotFound />
  }

  return (
    <div className="app">
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        मुख्य सामग्री पर जाएँ
      </a>
      <Header section={section} />
      <main id="main" tabIndex={-1}>
        {page}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
