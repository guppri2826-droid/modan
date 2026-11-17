import { useEffect, useMemo, useRef, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { Logo } from '../components/Ornament.jsx'
import { Link } from '../router.jsx'
import Icon from '../components/Icons.jsx'
import {
  CLUB_NAME,
  CLUB_NAME_EN,
  DECLARATION,
  MARITAL_STATUS,
  OCCUPATIONS,
  SURNAMES,
} from '../content/club.js'

const DRAFT_KEY = 'mec-application-draft-v1'
const MAX_CHILDREN = 5

const today = () => new Date().toISOString().slice(0, 10)

const emptyChild = () => ({ name: '', dob: '', qualification: '', profession: '', marital: '' })

const EMPTY = {
  name: '',
  surname: '',
  fatherName: '',
  dob: '',
  qualification: '',
  occupation: '',
  occupationDetails: '',
  permanentAddress: '',
  presentAddress: '',
  sameAddress: false,
  landline: '',
  mobile: '',
  email: '',
  spouseName: '',
  children: [],
  note: '',
  references: [
    { name: '', mobile: '' },
    { name: '', mobile: '' },
    { name: '', mobile: '' },
  ],
  declaration: false,
  date: today(),
  place: '',
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return EMPTY
    const saved = JSON.parse(raw)
    return { ...EMPTY, ...saved, date: saved.date || today() }
  } catch {
    return EMPTY
  }
}

function saveDraft(data) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  } catch {
    /* storage unavailable — the form still works */
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    /* ignore */
  }
}

const onlyDigits = (s) => s.replace(/\D/g, '')
const isMobile = (s) => /^(91)?[6-9]\d{9}$/.test(onlyDigits(s))
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())

function validate(f) {
  const e = {}
  const req = (key, label) => {
    if (!String(f[key] ?? '').trim()) e[key] = `${label} आवश्यक है`
  }
  req('name', 'सदस्य का नाम')
  if (!f.surname) e.surname = 'उपनाम चुनें'
  req('fatherName', 'पिता/पति का नाम')
  req('dob', 'जन्म तिथि')
  req('qualification', 'योग्यता')
  if (!f.occupation) e.occupation = 'व्यवसाय चुनें'
  req('occupationDetails', 'व्यवसाय का विवरण')
  req('permanentAddress', 'स्थायी पता')
  if (!f.mobile.trim()) e.mobile = 'मोबाइल नम्बर आवश्यक है'
  else if (!isMobile(f.mobile)) e.mobile = 'मान्य 10 अंकों का मोबाइल नम्बर लिखें'
  if (f.email.trim() && !isEmail(f.email)) e.email = 'मान्य ई-मेल लिखें'
  f.references.forEach((r, i) => {
    if (!r.name.trim()) e[`ref${i}name`] = 'संदर्भ का नाम आवश्यक है'
    if (!r.mobile.trim()) e[`ref${i}mobile`] = 'मोबाइल नम्बर आवश्यक है'
    else if (!isMobile(r.mobile)) e[`ref${i}mobile`] = 'मान्य मोबाइल नम्बर लिखें'
  })
  if (!f.declaration) e.declaration = 'घोषणा स्वीकार करना आवश्यक है'
  req('place', 'स्थान')
  return e
}

function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

/* ---------- small field helpers ---------- */

function Field({ label, hint, error, required, children, className = '' }) {
  return (
    <label className={'field ' + className + (error ? ' has-error' : '')}>
      <span className="field-label">
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error" role="alert">{error}</span>}
    </label>
  )
}

/* ---------- page ---------- */

export default function Apply() {
  const [form, setForm] = useState(loadDraft)
  const [errors, setErrors] = useState({})
  const [mode, setMode] = useState('edit') // 'edit' | 'preview'
  const [attempted, setAttempted] = useState(false)
  const topRef = useRef(null)

  useEffect(() => saveDraft(form), [form])

  // live re-validation once the user has tried to submit
  useEffect(() => {
    if (attempted) setErrors(validate(form))
  }, [form, attempted])

  const set = (key) => (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  const setRef = (i, key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({
      ...f,
      references: f.references.map((r, j) => (j === i ? { ...r, [key]: value } : r)),
    }))
  }

  const setChild = (i, key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({
      ...f,
      children: f.children.map((c, j) => (j === i ? { ...c, [key]: value } : c)),
    }))
  }

  const addChild = () =>
    setForm((f) => (f.children.length >= MAX_CHILDREN ? f : { ...f, children: [...f.children, emptyChild()] }))

  const removeChild = (i) =>
    setForm((f) => ({ ...f, children: f.children.filter((_, j) => j !== i) }))

  const errorCount = Object.keys(errors).length

  const onSubmit = (ev) => {
    ev.preventDefault()
    setAttempted(true)
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) {
      // focus the first invalid field
      requestAnimationFrame(() => {
        const el = document.querySelector('.has-error input, .has-error select, .has-error textarea')
        el?.focus()
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }
    setMode('preview')
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  const onReset = () => {
    if (!window.confirm('क्या आप पूरा फॉर्म खाली करना चाहते हैं?')) return
    clearDraft()
    setForm({ ...EMPTY, date: today() })
    setErrors({})
    setAttempted(false)
  }

  const presentAddress = form.sameAddress ? form.permanentAddress : form.presentAddress

  return (
    <>
      <PageHero
        eyebrow="Application for Membership"
        title="सदस्यता आवेदन पत्र"
        subtitle="Registration Free — रजिस्ट्रेशन निःशुल्क है। * चिह्नित सभी जानकारी आवश्यक है।"
        icon="pen"
      />

      <section className="section" ref={topRef}>
        <div className="container form-wrap">
          {mode === 'preview' ? (
            <Preview
              form={form}
              presentAddress={presentAddress}
              onEdit={() => setMode('edit')}
            />
          ) : (
            <>
            <div className="prep-card no-print">
              <div className="prep-head">
                <span className="prep-icon"><Icon name="check" size={26} /></span>
                <div>
                  <p className="prep-title">आवेदन से पहले तैयार रखें</p>
                  <p className="muted">लगभग 5 मिनट लगेंगे। आपका फॉर्म अपने-आप सहेजा जाता रहेगा।</p>
                </div>
              </div>
              <ul className="prep-list">
                <li><Icon name="user" size={18} /> मान्य 12 उपनामों में से अपना उपनाम</li>
                <li><Icon name="home" size={18} /> स्थायी एवं वर्तमान पता, मोबाइल नम्बर</li>
                <li><Icon name="family" size={18} /> पति/पत्नी एवं पुत्र/पुत्री का विवरण (यदि हो)</li>
                <li><Icon name="people" size={18} /> तीन संदर्भ — नाम एवं मोबाइल नम्बर (अनिवार्य)</li>
              </ul>
              <nav className="jump-chips" aria-label="फॉर्म के भाग">
                {[
                  ['f-personal', '1 व्यक्तिगत'],
                  ['f-address', '2 पता'],
                  ['f-family', '3 परिवार'],
                  ['f-refs', '4 संदर्भ'],
                  ['f-decl', '5 घोषणा'],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={'#' + id}
                    className="jump-chip"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <form className="app-form" onSubmit={onSubmit} noValidate>
              {attempted && errorCount > 0 && (
                <div className="form-alert" role="alert">
                  कृपया {errorCount} चिह्नित {errorCount === 1 ? 'जानकारी' : 'जानकारियाँ'} पूरी करें।
                </div>
              )}

              {/* 1 — personal */}
              <fieldset className="form-section" id="f-personal">
                <legend><span className="legend-num">1</span> व्यक्तिगत विवरण <span className="legend-en">Personal details</span></legend>
                <div className="grid-2">
                  <Field label="Member's Name / सदस्य का नाम" required error={errors.name}>
                    <input value={form.name} onChange={set('name')} autoComplete="given-name" />
                  </Field>
                  <Field label="Surname / उपनाम" required error={errors.surname} hint="Other surname not accepted">
                    <select value={form.surname} onChange={set('surname')}>
                      <option value="">— चुनें —</option>
                      {SURNAMES.map((s, i) => (
                        <option key={s} value={s}>({i + 1}) {s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Father's / Husband's Name / पिता या पति का नाम" required error={errors.fatherName}>
                    <input value={form.fatherName} onChange={set('fatherName')} />
                  </Field>
                  <Field label="Date of Birth / जन्म तिथि" required error={errors.dob}>
                    <input type="date" value={form.dob} onChange={set('dob')} max={today()} />
                  </Field>
                  <Field label="Qualification / शैक्षिक योग्यता" required error={errors.qualification}>
                    <input value={form.qualification} onChange={set('qualification')} />
                  </Field>
                  <div className={'field' + (errors.occupation ? ' has-error' : '')}>
                    <span className="field-label">
                      Occupation / व्यवसाय<span className="req" aria-hidden="true"> *</span>
                    </span>
                    <div className="segmented" role="radiogroup" aria-label="Occupation">
                      {OCCUPATIONS.map((o) => (
                        <label key={o} className={'seg' + (form.occupation === o ? ' is-on' : '')}>
                          <input
                            type="radio"
                            name="occupation"
                            value={o}
                            checked={form.occupation === o}
                            onChange={set('occupation')}
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                    {errors.occupation && <span className="field-error" role="alert">{errors.occupation}</span>}
                  </div>
                </div>
                <Field
                  label="Details of occupation / व्यवसाय का विवरण"
                  hint="Post & Department etc."
                  required
                  error={errors.occupationDetails}
                >
                  <textarea rows={2} value={form.occupationDetails} onChange={set('occupationDetails')} />
                </Field>
              </fieldset>

              {/* 2 — address (hide portion) */}
              <fieldset className="form-section" id="f-address">
                <legend><span className="legend-num">2</span> पता एवं सम्पर्क <span className="legend-en">Address</span></legend>
                <p className="privacy-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                  Hide Portion — यह जानकारी गोपनीय रखी जाती है।
                </p>
                <Field label="Permanent Address / स्थायी पता" required error={errors.permanentAddress}>
                  <textarea rows={2} value={form.permanentAddress} onChange={set('permanentAddress')} autoComplete="street-address" />
                </Field>
                <label className="check">
                  <input type="checkbox" checked={form.sameAddress} onChange={set('sameAddress')} />
                  वर्तमान पता स्थायी पते के समान है
                </label>
                {!form.sameAddress && (
                  <Field label="Present Address / वर्तमान पता">
                    <textarea rows={2} value={form.presentAddress} onChange={set('presentAddress')} />
                  </Field>
                )}
                <div className="grid-3">
                  <Field label="Phone No. (Landline)">
                    <input type="tel" value={form.landline} onChange={set('landline')} />
                  </Field>
                  <Field label="Mobile No. / मोबाइल" required error={errors.mobile}>
                    <input type="tel" inputMode="numeric" value={form.mobile} onChange={set('mobile')} autoComplete="tel" />
                  </Field>
                  <Field label="E-mail / ई-मेल" error={errors.email}>
                    <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                  </Field>
                </div>
              </fieldset>

              {/* 3 — family */}
              <fieldset className="form-section" id="f-family">
                <legend><span className="legend-num">3</span> पारिवारिक विवरण <span className="legend-en">Family details</span></legend>
                <Field label="Spouse Name / पति या पत्नी का नाम" className="field-half">
                  <input value={form.spouseName} onChange={set('spouseName')} />
                </Field>

                <div className="children">
                  <p className="field-label">Son / Daughter — पुत्र / पुत्री</p>
                  {form.children.length === 0 && (
                    <p className="muted">अभी कोई प्रविष्टि नहीं जोड़ी गई है।</p>
                  )}
                  {form.children.map((c, i) => (
                    <div key={i} className="child-row">
                      <span className="child-num">{i + 1}</span>
                      <div className="child-fields">
                        <Field label="Name / नाम">
                          <input value={c.name} onChange={setChild(i, 'name')} />
                        </Field>
                        <Field label="Date of Birth">
                          <input type="date" value={c.dob} onChange={setChild(i, 'dob')} max={today()} />
                        </Field>
                        <Field label="Qualification">
                          <input value={c.qualification} onChange={setChild(i, 'qualification')} />
                        </Field>
                        <Field label="Profession">
                          <input value={c.profession} onChange={setChild(i, 'profession')} />
                        </Field>
                        <Field label="Marital Status">
                          <select value={c.marital} onChange={setChild(i, 'marital')}>
                            <option value="">—</option>
                            {MARITAL_STATUS.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <button type="button" className="icon-btn" onClick={() => removeChild(i)} aria-label={`प्रविष्टि ${i + 1} हटाएँ`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                      </button>
                    </div>
                  ))}
                  {form.children.length < MAX_CHILDREN && (
                    <button type="button" className="btn btn-outline btn-sm" onClick={addChild}>
                      + पुत्र / पुत्री जोड़ें
                    </button>
                  )}
                </div>

                <Field label="Note (If any) / टिप्पणी">
                  <textarea rows={2} value={form.note} onChange={set('note')} />
                </Field>
              </fieldset>

              {/* 4 — references */}
              <fieldset className="form-section" id="f-refs">
                <legend><span className="legend-num">4</span> संदर्भ <span className="legend-en">References (Must)</span></legend>
                <p className="muted">तीन संदर्भ देना अनिवार्य है।</p>
                {form.references.map((r, i) => (
                  <div key={i} className="ref-row">
                    <span className="child-num">{i + 1}</span>
                    <Field label="Name / नाम" required error={errors[`ref${i}name`]}>
                      <input value={r.name} onChange={setRef(i, 'name')} />
                    </Field>
                    <Field label="Mob. No." required error={errors[`ref${i}mobile`]}>
                      <input type="tel" inputMode="numeric" value={r.mobile} onChange={setRef(i, 'mobile')} />
                    </Field>
                  </div>
                ))}
              </fieldset>

              {/* 5 — declaration */}
              <fieldset className="form-section" id="f-decl">
                <legend><span className="legend-num">5</span> घोषणा <span className="legend-en">Declaration</span></legend>
                <label className={'check check-box' + (errors.declaration ? ' has-error' : '')}>
                  <input type="checkbox" checked={form.declaration} onChange={set('declaration')} />
                  <span>
                    {DECLARATION}
                    <span className="decl-hi">
                      मेरे द्वारा दी गई सभी जानकारी सत्य एवं सही है तथा मैं क्लब के सभी नियमों एवं शर्तों से सहमत हूँ।
                    </span>
                  </span>
                </label>
                {errors.declaration && <p className="field-error" role="alert">{errors.declaration}</p>}
                <div className="grid-2">
                  <Field label="Date / दिनांक">
                    <input type="date" value={form.date} onChange={set('date')} />
                  </Field>
                  <Field label="Place / स्थान" required error={errors.place}>
                    <input value={form.place} onChange={set('place')} />
                  </Field>
                </div>
              </fieldset>

              <div className="form-actions">
                <button type="button" className="btn btn-text" onClick={onReset}>फॉर्म खाली करें</button>
                <button type="submit" className="btn btn-primary btn-lg">आवेदन पत्र देखें →</button>
              </div>
              <p className="muted small center">
                आपका भरा हुआ फॉर्म इसी ब्राउज़र में अपने-आप सहेजा जाता है, ताकि आप बाद में भी पूरा कर सकें।
              </p>
            </form>
            </>
          )}
        </div>
      </section>
    </>
  )
}

/* ---------- printable application ---------- */

function Preview({ form, presentAddress, onEdit }) {
  const children = useMemo(
    () => form.children.filter((c) => Object.values(c).some((v) => String(v).trim())),
    [form.children],
  )

  return (
    <div className="preview">
      <div className="preview-bar no-print">
        <div>
          <p className="preview-ok">✓ आवेदन पत्र तैयार है</p>
          <p className="muted">प्रिंट करें या “Save as PDF” चुनकर सहेजें, और हस्ताक्षर करके क्लब को सौंपें।</p>
        </div>
        <div className="preview-actions">
          <button type="button" className="btn btn-outline" onClick={onEdit}>← सुधार करें</button>
          <button type="button" className="btn btn-primary" onClick={() => window.print()}>प्रिंट / PDF सहेजें</button>
        </div>
      </div>

      <article className="sheet">
        <header className="sheet-head">
          <Logo size={54} />
          <div>
            <p className="sheet-club">{CLUB_NAME}</p>
            <p className="sheet-club-en">{CLUB_NAME_EN}</p>
          </div>
          <span className="sheet-free">(Registration Free)</span>
        </header>
        <h2 className="sheet-title">APPLICATION FOR MEMBERSHIP</h2>

        <dl className="sheet-grid">
          <Row k="Member's Name" v={form.name} />
          <Row k="Surname" v={form.surname} />
          <Row k="Father's / Husband's Name" v={form.fatherName} />
          <Row k="Date of Birth" v={fmtDate(form.dob)} />
          <Row k="Qualification" v={form.qualification} />
          <Row k="Occupation" v={form.occupation} />
          <Row k="Details of occupation" v={form.occupationDetails} wide />
        </dl>

        <h3 className="sheet-sub">Address <span className="sheet-hide">(Hide Portion)</span></h3>
        <dl className="sheet-grid">
          <Row k="Permanent" v={form.permanentAddress} wide />
          <Row k="Present" v={presentAddress} wide />
          <Row k="Phone No. (Landline)" v={form.landline} />
          <Row k="Mobile No." v={form.mobile} />
          <Row k="E-mail" v={form.email} wide />
        </dl>

        <h3 className="sheet-sub">Family Details</h3>
        <dl className="sheet-grid">
          <Row k="Spouse Name" v={form.spouseName} wide />
        </dl>
        <table className="sheet-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Son/Daughter Name</th>
              <th>Date of Birth</th>
              <th>Qualification</th>
              <th>Profession</th>
              <th>Marital Status</th>
            </tr>
          </thead>
          <tbody>
            {(children.length ? children : [null]).map((c, i) =>
              c ? (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{fmtDate(c.dob)}</td>
                  <td>{c.qualification}</td>
                  <td>{c.profession}</td>
                  <td>{c.marital}</td>
                </tr>
              ) : (
                <tr key="none">
                  <td colSpan={6} className="muted">—</td>
                </tr>
              ),
            )}
          </tbody>
        </table>

        {form.note.trim() && (
          <dl className="sheet-grid">
            <Row k="Note" v={form.note} wide />
          </dl>
        )}

        <h3 className="sheet-sub">Declaration</h3>
        <p className="sheet-decl">{DECLARATION}</p>

        <h3 className="sheet-sub">References (Must)</h3>
        <table className="sheet-table">
          <tbody>
            {form.references.map((r, i) => (
              <tr key={i}>
                <td style={{ width: '3rem' }}>({i + 1})</td>
                <td>{r.name}</td>
                <td style={{ width: '40%' }}>Mob. No. {r.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="sheet-foot">
          <div>
            <p>Date: <strong>{fmtDate(form.date)}</strong></p>
            <p>Place: <strong>{form.place}</strong></p>
          </div>
          <div className="sheet-sign">
            <span className="sign-line" />
            <p>Name of member</p>
            <p><strong>{[form.name, form.surname].filter(Boolean).join(' ')}</strong></p>
          </div>
        </div>
      </article>

      <p className="muted small center no-print">
        <Link to="/sadasyata">सदस्यता के नियम</Link> · सदस्यता स्वीकृत होने पर क्लब की ओर से आई.डी. नम्बर जारी किया जायेगा।
      </p>
    </div>
  )
}

function Row({ k, v, wide }) {
  return (
    <div className={'sheet-row' + (wide ? ' sheet-row-wide' : '')}>
      <dt>{k}</dt>
      <dd>{v || '—'}</dd>
    </div>
  )
}
