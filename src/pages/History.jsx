import { useEffect, useState } from 'react'
import { Link, navigate } from '../router.jsx'
import PageHero from '../components/PageHero.jsx'
import Blocks from '../components/Blocks.jsx'
import { Divider, Mandala, Wave } from '../components/Ornament.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import { ReadingProgress } from '../components/BackToTop.jsx'
import NotFound from './NotFound.jsx'
import { chapters, getChapter } from '../content/history/index.js'

const SIZE_KEY = 'mec-reading-size'
const SIZES = [
  { id: 's', label: 'अ', title: 'छोटा' },
  { id: 'm', label: 'अ', title: 'सामान्य' },
  { id: 'l', label: 'अ', title: 'बड़ा' },
]

function useReadingSize() {
  const [size, setSize] = useState(() => {
    try {
      return localStorage.getItem(SIZE_KEY) || 'm'
    } catch {
      return 'm'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(SIZE_KEY, size)
    } catch {
      /* ignore */
    }
  }, [size])
  return [size, setSize]
}

export function HistoryIndex() {
  return (
    <>
      <PageHero
        eyebrow="इतिहास एवं संस्कार"
        title="मोदनवाल वैश्य — इतिहास, धर्म एवं संस्कार"
        subtitle="क्लब की पुस्तिका से — जाति व्यवस्था का इतिहास, मोदनवाल वैश्यों की उत्पत्ति, जन्म भूमि, गोत्र, संस्कार, संध्योपासन विधि, संघ-शक्ति एवं समाज सुधार के सुझाव।"
        icon="jati-vyavastha"
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">अनुक्रमणिका</p>
            <h2 className="section-title">अध्याय</h2>
            <Divider />
          </div>
          <ol className="toc-grid">
            {chapters.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 2) * 90}>
                <Link to={`/itihas/${c.id}`} className="toc-card">
                  <span className="toc-icon">
                    <Icon name={c.id} />
                    <span className="toc-n">{i + 1}</span>
                  </span>
                  <span className="toc-body">
                    <span className="toc-title">{c.short}</span>
                    <span className="toc-en">{c.en}</span>
                    <span className="toc-desc">{c.desc}</span>
                  </span>
                  <span className="toc-arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

export function HistoryChapter({ id }) {
  const found = getChapter(id)
  const [size, setSize] = useReadingSize()

  if (!found) return <NotFound />
  const { chapter, prev, next, index } = found
  const subheads = chapter.blocks.filter((b) => b.type === 'heading')

  return (
    <>
      <ReadingProgress />
      <section className="chapter-hero">
        <Mandala className="page-hero-mandala" />
        <div className="container chapter-hero-inner">
          <span className="chapter-hero-icon"><Icon name={chapter.id} size={30} /></span>
          <div>
            <nav className="crumbs" aria-label="breadcrumb">
              <Link to="/itihas">इतिहास एवं संस्कार</Link>
              <span aria-hidden="true">/</span>
              <span>अध्याय {index + 1}</span>
            </nav>
            <h1 className="chapter-title">{chapter.title}</h1>
            <p className="chapter-en">{chapter.en}</p>
          </div>
        </div>
        <Wave className="hero-wave" />
      </section>

      <section className="section reader-section">
        <div className="container reader">
          <aside className="reader-side">
            <div className="side-sticky">
              <label className="side-select">
                <span className="sr-only">अध्याय चुनें</span>
                <select value={chapter.id} onChange={(e) => navigate(`/itihas/${e.target.value}`)}>
                  {chapters.map((c, i) => (
                    <option key={c.id} value={c.id}>
                      {i + 1}. {c.short}
                    </option>
                  ))}
                </select>
              </label>

              <nav className="side-toc" aria-label="अध्याय">
                <p className="side-label">अध्याय</p>
                <ol>
                  {chapters.map((c, i) => (
                    <li key={c.id}>
                      <Link
                        to={`/itihas/${c.id}`}
                        className={c.id === chapter.id ? 'is-active' : undefined}
                        aria-current={c.id === chapter.id ? 'page' : undefined}
                      >
                        <span className="side-num">{i + 1}</span>
                        {c.short}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>

              {subheads.length > 0 && (
                <nav className="side-sub" aria-label="इस अध्याय में">
                  <p className="side-label">इस अध्याय में</p>
                  <ul>
                    {subheads.map((h) => (
                      <li key={h.anchor}>
                        <a
                          href={'#' + h.anchor}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(h.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          <article className={`reader-main size-${size}`}>
            <div className="reader-tools">
              <span className="muted small">अक्षर का आकार</span>
              <div className="size-switch" role="group" aria-label="अक्षर का आकार">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={'size-btn size-btn-' + s.id + (size === s.id ? ' is-on' : '')}
                    aria-pressed={size === s.id}
                    title={s.title}
                    onClick={() => setSize(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <Blocks blocks={chapter.blocks} />
            <Divider className="chapter-end" />

            <nav className="pager" aria-label="अध्याय नेविगेशन">
              {prev ? (
                <Link to={`/itihas/${prev.id}`} className="pager-link">
                  <span className="pager-dir">← पिछला अध्याय</span>
                  <span className="pager-title">{prev.short}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={`/itihas/${next.id}`} className="pager-link pager-next">
                  <span className="pager-dir">अगला अध्याय →</span>
                  <span className="pager-title">{next.short}</span>
                </Link>
              ) : (
                <Link to="/aavedan" className="pager-link pager-next">
                  <span className="pager-dir">क्लब से जुड़ें →</span>
                  <span className="pager-title">सदस्यता आवेदन पत्र</span>
                </Link>
              )}
            </nav>
          </article>
        </div>
      </section>
    </>
  )
}
