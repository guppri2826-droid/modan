import { Link } from '../router.jsx'
import { Divider, Diya, Emblem, Mandala, Toran, Wave } from '../components/Ornament.jsx'
import { CountUp, Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import Petals from '../components/Petals.jsx'
import { CLUB_NAME, GREETING, objective, structure, SURNAMES } from '../content/club.js'
import { chapters } from '../content/history/index.js'

const managingTotal = structure.managing.reduce((s, p) => s + p.count, 0)

const FACTS = [
  { icon: 'gift', value: 'निःशुल्क', label: 'सदस्यता पंजीकरण' },
  { icon: 'people', value: managingTotal, label: 'मैनेजिंग कमेटी के पद' },
  { icon: 'bulb', value: structure.advisory.count, label: 'सलाहकार समिति के प्रबुद्ध सदस्य' },
  { icon: 'calendar', value: 2, suffix: ' वर्ष', label: 'पदाधिकारियों का कार्यकाल' },
]

const WHY = [
  {
    icon: 'people',
    title: 'सामाजिक भागीदारी',
    text: 'अधिकारी व प्रोफैशनल वर्ग के लोग सामाजिक कार्यों में इतना बढ़-चढ़कर भाग नहीं लेते, जितना उन्हें लेना चाहिये।',
  },
  {
    icon: 'link',
    title: 'आपसी पहचान',
    text: 'एक-दूसरे से पहचान के अभाव में बंधु स्वतः के समुदाय से उपेक्षित रहते हैं। उपनामों की अधिकता से पहचान भी नहीं हो पाती।',
  },
  {
    icon: 'meet',
    title: 'वार्षिक बैठक',
    text: 'क्लब की कोशिश होगी कि हर वर्ष सभी सदस्यों की किसी उपयुक्त पर्यटक स्थल पर एक बैठक बुलाई जा सके।',
  },
  {
    icon: 'rise',
    title: 'सामाजिक उत्थान',
    text: 'ताकि सामाजिक सौहार्द बना रहे, साथ ही सामाजिक उत्थान के लिये कार्य किया जा सके।',
  },
]

const CHIPS = ['डॉक्टर', 'इंजीनियर', 'सीए', 'एडवोकेट', 'पत्रकार', 'अधिकारी']

// From the club booklet (origin chapter, pages 3–6)
const MODANSEN = {
  origin:
    'वैश्यो के मूल पुरूष भलनन्दन जी की तीसरी पीढी में जन्म लेने वाले प्राशु के चोथे पुत्र ‘मोदन’ (बाद मे ‘सेन’ अंलकार स्वरूप जोड़ा गया) से यह मोदनवाल वैश्य समाज उत्पन्न हुआ।',
  facts: [
    { icon: 'calendar', title: 'जयन्ती', text: 'कार्तिक शुक्ल अक्षय नवमी — प्रतिवर्ष बड़े ही धूमधाम से मनायी जाती है।' },
    { icon: 'temple', title: 'राजधानी', text: 'कान्य कुब्ज देश की महोदय पुरी — जो अब कन्नौज के रूप में जानी जाती है।' },
    { icon: 'chef', title: 'पाक कला के आचार्य', text: 'प्रजापति के वृहदयज्ञ में आये अतिथि देवताओं की भांति-भांति के पाक पदार्थों से आवभगत की।' },
  ],
  shloka: ['मोदनस्य च वंशाये मोदकानां प्रकारकाः।', 'वैश्य वृत्ति समाश्रित्य संजाताः पृथिवीतले।।'],
  meaning:
    'मोदन के वंश में, मोदक (लड्डू) आदि का व्यवसाय करने वाले वैश्य, उत्पन्न हुए। जोकि इस वैश्य वृत्ति के द्वारा संसार में फैले।',
}

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <Toran className="hero-toran" />
        <Mandala className="hero-mandala" />
        <Petals />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="greet-pill">
              <span className="greet-dot" aria-hidden="true" />
              {GREETING}
            </p>
            <h1 className="hero-title">
              <span className="gold-text">मोदनवाल</span>
              <span className="hero-title-2">एक्जीक्यूटिव क्लब</span>
            </h1>
            <p className="hero-lead">{objective.lead}</p>
            <div className="hero-actions">
              <Link to="/aavedan" className="btn btn-gold btn-lg">
                सदस्यता आवेदन करें
                <span aria-hidden="true">→</span>
              </Link>
              <Link to="/uddeshya" className="btn btn-ghost-light btn-lg">
                क्लब के उद्देश्य
              </Link>
            </div>
            <p className="hero-note">
              <Icon name="gift" size={18} /> वर्तमान में सदस्यता शुल्क निर्धारित नहीं है — रजिस्ट्रेशन निःशुल्क है।
            </p>
          </div>

          <div className="hero-art">
            <Emblem />
            {CHIPS.map((c, i) => (
              <span key={c} className={`float-chip fc-${i + 1}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <Wave className="hero-wave" />
      </section>

      {/* ───────── FACTS ───────── */}
      <section className="facts" aria-label="मुख्य तथ्य">
        <div className="container">
          <Reveal className="facts-grid">
            {FACTS.map((f) => (
              <div key={f.label} className="fact">
                <span className="fact-icon"><Icon name={f.icon} size={22} /></span>
                <span className="fact-value">
                  <CountUp value={f.value} suffix={f.suffix} />
                </span>
                <span className="fact-label">{f.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────── WHY ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">क्लब का उद्देश्य</p>
            <h2 className="section-title">एक प्लेटफार्म, एक पहचान</h2>
            <Divider />
            <p className="section-lead">
              इसी कमी को दूर करने के उद्देश्य से “मोदनवाल एक्जीक्यूटिव क्लब” की स्थापना की गई है।
            </p>
          </Reveal>
          <div className="card-grid card-grid-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <article className="card why-card">
                  <span className="why-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="why-icon"><Icon name={w.icon} /></span>
                  <h3 className="card-title">{w.title}</h3>
                  <p>{w.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SHRI MODANSEN JI ───────── */}
      <section className="modansen">
        <Mandala className="modansen-mandala" />
        <div className="container">
          <div className="modansen-grid">
            <Reveal className="modansen-art">
              <Diya />
            </Reveal>
            <Reveal className="modansen-copy" delay={120}>
              <p className="eyebrow eyebrow-light">आदि पुरुष</p>
              <h2 className="modansen-title">
                पूज्यपाद <span className="gold-text">श्री मोदनसेन जी महाराज</span>
              </h2>
              <p className="modansen-lead">{MODANSEN.origin}</p>
              <ul className="modansen-facts">
                {MODANSEN.facts.map((f) => (
                  <li key={f.title}>
                    <span className="mf-icon"><Icon name={f.icon} size={22} /></span>
                    <span>
                      <strong>{f.title}</strong>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/itihas/utpatti" className="text-link text-link-light">
                उत्पत्ति का पूरा विवरण पढ़ें →
              </Link>
            </Reveal>
          </div>

          <Reveal className="verse-card">
            <p className="verse-source">वर्णविवेक चन्द्रिका</p>
            <blockquote className="verse">
              {MODANSEN.shloka.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </blockquote>
            <Divider />
            <p className="verse-meaning">{MODANSEN.meaning}</p>
          </Reveal>
        </div>
      </section>

      {/* ───────── MODANWAL = COLLECTIVE NAME ───────── */}
      <section className="section section-pattern">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">मोदनवाल — एक सामूहिक नाम</p>
            <h2 className="section-title section-title-left">सभी हलवाई वैश्यों का विस्तारित नाम</h2>
            <Divider className="divider-left" />
            <p className="body-lg">
              वास्तव में ‘मोदनवाल’ शब्द सभी हलवाई वैश्यों का एक विस्तारित या सामूहिक नाम है, जिसमें हलवाई वैश्यों के सभी घटक आते हैं।
              यह सभी ‘मोदनवाल’ वैश्य के नाम से पहचाने जाते हैं।
            </p>
            <ul className="chip-list chip-list-lg">
              {objective.ghatak.map((g) => (
                <li key={g} className="chip chip-maroon">{g}</li>
              ))}
              <li className="chip chip-outline">आदि-आदि वैश्य</li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="surname-panel">
              <span className="corner corner-tl" aria-hidden="true" />
              <span className="corner corner-tr" aria-hidden="true" />
              <span className="corner corner-bl" aria-hidden="true" />
              <span className="corner corner-br" aria-hidden="true" />
              <p className="surname-title">आवेदन पत्र में मान्य उपनाम</p>
              <ol className="surname-list">
                {SURNAMES.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="surname-note">Note — Other surname not accepted</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── HISTORY ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">पुस्तिका से</p>
            <h2 className="section-title">इतिहास, धर्म एवं संस्कार</h2>
            <Divider />
            <p className="section-lead">
              मोदनवाल वैश्यों की उत्पत्ति, जन्म भूमि, गोत्र, संस्कार, संध्योपासन विधि और समाज सुधार के सुझाव — क्लब की पुस्तिका के अनुसार।
            </p>
          </Reveal>
          <div className="card-grid card-grid-3">
            {chapters.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 90}>
                <Link to={`/itihas/${c.id}`} className="card chapter-card">
                  <span className="chapter-watermark" aria-hidden="true">{i + 1}</span>
                  <span className="chapter-icon"><Icon name={c.id} /></span>
                  <span className="chapter-num">अध्याय {i + 1}</span>
                  <h3 className="card-title">{c.short}</h3>
                  <p>{c.desc}</p>
                  <span className="text-link">पढ़ें <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="cta-band">
        <Toran className="cta-toran" />
        <div className="container cta-inner">
          <Reveal>
            <p className="cta-greet gold-text">{GREETING}</p>
            <h2 className="cta-title">आज ही क्लब से जुड़ें</h2>
            <p className="cta-text">
              आवेदन पत्र ऑनलाइन भरें, प्रिंट करें या PDF सहेजें। सदस्यता स्वीकृत होने पर क्लब की ओर से एक आई.डी. नम्बर जारी किया जायेगा।
            </p>
            <p className="cta-quote">
              “जब भी मोदनवाल समाज के लोग आपस में मिले तो अभिवादन स्वरूप एक दूसरे से ‘जय मोदनसेन’ शब्द कहकर अभिवादन करें।”
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/aavedan" className="btn btn-gold btn-xl">
              आवेदन पत्र भरें <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
