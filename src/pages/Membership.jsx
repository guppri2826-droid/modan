import { Link } from '../router.jsx'
import PageHero from '../components/PageHero.jsx'
import { Divider } from '../components/Ornament.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import { membership } from '../content/club.js'

const { eligibility, termination, notes } = membership

const STEPS = [
  { icon: 'pen', title: 'आवेदन पत्र भरें', text: 'व्यक्तिगत विवरण, पता, पारिवारिक विवरण और तीन संदर्भ (अनिवार्य) के साथ।' },
  { icon: 'doc', title: 'घोषणा एवं जमा', text: 'घोषणा स्वीकार करें, आवेदन पत्र प्रिंट करें या PDF सहेजकर क्लब को सौंपें।' },
  { icon: 'idcard', title: 'आई.डी. नम्बर', text: 'सदस्यता स्वीकृत होने पर क्लब की ओर से एक आई.डी. नम्बर जारी किया जायेगा।' },
]

export default function Membership() {
  return (
    <>
      <PageHero
        eyebrow="सदस्यता"
        title="सदस्यता के नियम"
        subtitle="वर्तमान में सदस्यता शुल्क निर्धारित नहीं है, अतः सदस्यों का रजिस्ट्रेशन निःशुल्क है।"
        icon="idcard"
      >
        <div className="hero-actions">
          <Link to="/aavedan" className="btn btn-gold btn-lg">आवेदन पत्र भरें <span aria-hidden="true">→</span></Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <Reveal className="free-ribbon">
            <span className="free-icon"><Icon name="gift" size={30} /></span>
            <div>
              <p className="free-title">पंजीकरण पूर्णतः निःशुल्क</p>
              <p className="free-text">वर्तमान में सदस्यता शुल्क निर्धारित नहीं है — आज ही आवेदन करें।</p>
            </div>
            <Link to="/aavedan" className="btn btn-primary">आवेदन करें</Link>
          </Reveal>

          <Reveal className="section-head">
            <p className="eyebrow">पात्रता</p>
            <h2 className="section-title">{eligibility.heading}</h2>
            <Divider />
          </Reveal>

          <div className="card-grid card-grid-3">
            {eligibility.groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 90}>
                <article className="card elig-card">
                  <span className="why-icon"><Icon name={['people', 'crown', 'temple'][i]} /></span>
                  <h3 className="card-title">{g.title}</h3>
                  <p>{g.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="narrow">
            <Reveal className="callout">
              <p className="callout-title"><Icon name="doc" size={20} /> मूल नियम</p>
              <p>{eligibility.text}</p>
            </Reveal>
            <Reveal className="callout callout-gold">
              <p className="callout-title"><Icon name="idcard" size={20} /> आई.डी. नम्बर</p>
              <p>{eligibility.idNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">प्रक्रिया</p>
            <h2 className="section-title">सदस्य कैसे बनें</h2>
            <Divider />
          </Reveal>
          <ol className="steps steps-linked">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} className="step" delay={i * 140}>
                <span className="step-medal">
                  <Icon name={s.icon} size={28} />
                  <span className="step-n">{i + 1}</span>
                </span>
                <h3 className="card-title">{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <Reveal>
            <h2 className="section-title section-title-left">{termination.heading}</h2>
            <Divider className="divider-left" />
            <ol className="rule-list">
              {termination.items.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="section-title section-title-left mt-xl">{notes.heading}</h2>
            <Divider className="divider-left" />
            <ol className="rule-list rule-list-gold">
              {notes.items.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </Reveal>

          <div className="inline-cta">
            <p>रजिस्ट्रेशन निःशुल्क है — आवेदन पत्र ऑनलाइन भरें।</p>
            <Link to="/aavedan" className="btn btn-primary">आवेदन पत्र भरें</Link>
          </div>
        </div>
      </section>
    </>
  )
}
