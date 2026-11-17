import { Link } from '../router.jsx'
import PageHero from '../components/PageHero.jsx'
import { Divider } from '../components/Ornament.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import { objective, structure } from '../content/club.js'

const managingTotal = structure.managing.reduce((s, p) => s + p.count, 0)

const POST_ICONS = ['crown', 'people', 'pen', 'doc', 'gift', 'idcard', 'bulb', 'user']

const TIMELINE = [
  {
    icon: 'calendar',
    when: 'प्रथम बैठक से पहले दो वर्ष',
    what: 'जब तक क्लब के सभी अंग सुचारू रूप से कार्य नहीं करने लग जाते, नामित सदस्य ही कार्य करेंगे।',
  },
  {
    icon: 'check',
    when: 'इसके बाद',
    what: 'सर्वसम्मति से/लोकतान्त्रिक तरीके से अध्यक्ष एवं महामन्त्री का चुनाव होगा। अन्य सभी पदाधिकारियों को अध्यक्ष एवं महामन्त्री मिलकर नामित कर सकेंगे।',
  },
  {
    icon: 'refresh',
    when: 'प्रत्येक दो वर्ष',
    what: 'वार्षिक बैठक में मैनेजिंग कमेटी एवं सलाहकार समिति के सदस्य मिलकर अध्यक्ष एवं महामन्त्री का चुनाव कर सकेंगे। सभी पदाधिकारियों का कार्यकाल दो वर्षों का होगा।',
  },
]

function Seats({ count }) {
  return (
    <span className="seats" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="seat" />
      ))}
    </span>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="उद्देश्य एवं संरचना"
        title={objective.title}
        subtitle={objective.lead}
        icon="temple"
      />

      {/* objective */}
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <p className="eyebrow">परिचय</p>
            <h2 className="section-title section-title-left">{objective.heading}</h2>
            <Divider className="divider-left" />
            <div className="prose prose-lg">
              {objective.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="about-aside">
            <div className="quote-card">
              <span className="quote-mark" aria-hidden="true">“</span>
              <p className="quote-text">{objective.lead}</p>
              <p className="quote-sub">क्लब से जुड़ सकते हैं —</p>
              <ul className="chip-list">
                {objective.professions.map((p) => (
                  <li key={p} className="chip">{p}</li>
                ))}
              </ul>
            </div>
            <div className="mini-cards">
              <div className="mini-card">
                <span className="mini-icon"><Icon name="meet" size={22} /></span>
                <span><strong>वार्षिक बैठक</strong> हर वर्ष किसी उपयुक्त पर्यटक स्थल पर सभी सदस्यों की बैठक बुलाने की कोशिश</span>
              </div>
              <div className="mini-card">
                <span className="mini-icon"><Icon name="family" size={22} /></span>
                <span><strong>सामाजिक सौहार्द</strong> एवं सामाजिक उत्थान के लिये कार्य</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* structure */}
      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">{structure.heading}</p>
            <h2 className="section-title">मैनेजिंग कमेटी एवं सलाहकार समिति</h2>
            <Divider />
            <p className="section-lead">{structure.text}</p>
          </Reveal>

          <div className="org2">
            <Reveal className="patron-card">
              <span className="patron-medal"><Icon name="crown" size={34} /></span>
              <span className="patron-text">
                <span className="patron-title">{structure.patron.title}</span>
                <span className="patron-en">Patron</span>
              </span>
            </Reveal>
            <div className="org2-line" aria-hidden="true" />

            <Reveal className="mc-head">
              <h3>मैनेजिंग कमेटी</h3>
              <span className="badge badge-gold">कुल {managingTotal} पद</span>
            </Reveal>
            <div className="post-grid">
              {structure.managing.map((p, i) => (
                <Reveal key={p.title} delay={(i % 4) * 80}>
                  <div className={'post-tile' + (i === 0 ? ' post-tile-lead' : '')}>
                    <span className="post-medal">
                      <Icon name={POST_ICONS[i]} size={22} />
                      <span className="post-badge">{p.count}</span>
                    </span>
                    <span className="post-title">{p.title}</span>
                    <span className="post-en">{p.en}</span>
                    <Seats count={p.count} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="advisory-band">
              <div className="advisory-people" aria-hidden="true">
                {Array.from({ length: structure.advisory.count }).map((_, i) => (
                  <span key={i} className="adv-avatar"><Icon name="user" size={20} /></span>
                ))}
              </div>
              <div>
                <h3>
                  {structure.advisory.heading}
                  <span className="badge badge-gold">{structure.advisory.count} प्रबुद्ध सदस्य</span>
                </h3>
                <p>{structure.advisory.text}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* elections */}
      <section className="section">
        <div className="container narrow">
          <Reveal>
            <p className="eyebrow">चुनाव एवं कार्यकाल</p>
            <h2 className="section-title section-title-left">पदाधिकारियों का चयन</h2>
            <Divider className="divider-left" />
          </Reveal>
          <ol className="timeline timeline-icons">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.when} className="timeline-item" delay={i * 120}>
                <span className="timeline-node"><Icon name={t.icon} size={20} /></span>
                <div className="timeline-card">
                  <span className="timeline-when">{t.when}</span>
                  <p>{t.what}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <details className="source-text">
            <summary>मूल पाठ देखें</summary>
            <div className="prose">
              {structure.election.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </details>

          <div className="inline-cta">
            <p>सदस्य कौन बन सकता है और सदस्यता के नियम क्या हैं?</p>
            <Link to="/sadasyata" className="btn btn-primary">सदस्यता के नियम</Link>
          </div>
        </div>
      </section>
    </>
  )
}
