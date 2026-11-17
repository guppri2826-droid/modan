// History & sanskar section (booklet pages 1–18 = PDF pages 5–23).
// The four parts are page-range transcriptions; here they are stitched
// back together and split into readable chapters.
// Load part1.js … part4.js in order (any that exist), so the site runs
// even while a part is missing.
const modules = import.meta.glob('./part*.js', { eager: true })
const parts = Object.keys(modules)
  .sort()
  .map((k) => modules[k].default || [])

// Chapters, in booklet order. `match` finds the heading block that opens the
// chapter; matching is sequential so repeated phrases later on don't collide.
export const CHAPTER_META = [
  {
    id: 'jati-vyavastha',
    short: 'जाति व्यवस्था का इतिहास',
    en: 'The varna system in India',
    desc: 'वर्ण एवं आश्रम व्यवस्था, कर्म आधारित वर्ण विभाजन तथा वैश्य वर्ण का स्वभाविक कर्म।',
    match: /जाति\s*व्यवस्था/,
  },
  {
    id: 'utpatti',
    short: 'मोदनवाल वैश्यों की उत्पत्ति',
    en: 'Origin of the Modanwal Vaishyas',
    desc: 'मूल पुरुष भलनन्दन, श्री मोदनसेन जी महाराज, वर्णविवेक चन्द्रिका के सन्दर्भ एवं पौराणिक ग्रन्थ।',
    match: /उत्पत्ति/,
  },
  {
    id: 'janm-bhoomi',
    short: 'जन्म भूमि',
    en: 'Homeland — Kanyakubj (Kannauj)',
    desc: 'कान्यकुब्ज देश, राजधानी महोदय पुरी (अब कन्नौज) और ‘हलवाई’ नाम का अर्थ।',
    match: /जन्म\s*भूमि/,
  },
  {
    id: 'gotra',
    short: 'गोत्र की खोज',
    en: 'Understanding gotra',
    desc: 'गोत्र क्या है, कश्यप गोत्र की मान्यता तथा कुल पुरोहित (आचार्य) का गोत्र।',
    match: /गोत्र\s*की\s*खोज/,
  },
  {
    id: 'dharm-sanskar',
    short: 'धर्म एवं संस्कार',
    en: 'Dharma and the sanskaras',
    desc: 'वैश्यों के धर्म, संस्कार क्या है, और पन्द्रह संस्कारों का विवरण।',
    match: /धर्म\s*एवं\s*संस्कार/,
  },
  {
    id: 'upanayan',
    short: 'उपनयन एवं यज्ञोपवीत',
    en: 'Upanayan and the sacred thread',
    desc: 'उपनयन का अर्थ, यज्ञोपवीत का समय, जनेऊ के तीन तन्तु, दुर्गा जनेऊ और विवाह के बाद यज्ञोपवीत।',
    match: /उपनयन\s*के\s*अर्थ/,
    keepHeading: true, // opens on a sub-heading: keep it in the body, use `short` as title
  },
  {
    id: 'sandhya',
    short: 'संध्योपासन विधि',
    en: 'Sandhya upasana — method',
    desc: 'गायत्री मंत्र, आचमन, प्राणायाम, प्रातः एवं सायं संध्या, अंगन्यास मंत्र — अर्थ सहित।',
    match: /संध्योपासन\s*विधि/,
  },
  {
    id: 'sangh-shakti',
    short: 'संघ-शक्ति',
    en: 'Strength in unity',
    desc: 'संघे शक्ति — संगठन से समाज और व्यक्ति का विकास, तथा मोदनवाल समाज की वर्तमान स्थिति।',
    match: /संघ\s*-?\s*शक्ति/,
  },
  {
    id: 'sudhar',
    short: 'समाज सुधार के सुझाव',
    en: 'Suggestions for the next generation',
    desc: 'मोदनवाल समाज को सुधारने का सरल व सहज मार्ग — आने वाली पीढ़ी के लिए 13 सुझाव व उपाय।',
    match: /सुधारने\s*का/,
  },
]

function stitch(parts) {
  const out = []
  for (const part of parts) {
    for (const raw of part) {
      const b = { ...raw }
      const prev = out[out.length - 1]
      // paragraph broken across a page boundary
      if (b.joinPrev && prev && prev.type === 'p' && b.type === 'p') {
        prev.text = (prev.text.trimEnd() + ' ' + b.text.trimStart()).trim()
        continue
      }
      // numbered list continuing across a page boundary
      if (
        b.type === 'ol' &&
        prev &&
        prev.type === 'ol' &&
        b.start &&
        (prev.start || 1) + prev.items.length === b.start
      ) {
        prev.items = [...prev.items, ...b.items]
        continue
      }
      delete b.joinPrev
      out.push(b)
    }
  }
  return out
}

function cleanTitle(t) {
  return t.replace(/[\s।:–—‘’-]+$/u, '').trim()
}

function splitChapters(blocks) {
  const chapters = CHAPTER_META.map((m) => ({ ...m, title: m.short, blocks: [] }))
  let current = -1
  let seq = 0
  for (const b of blocks) {
    const next = CHAPTER_META[current + 1]
    if (b.type === 'heading' && next && next.match.test(b.text)) {
      current += 1
      if (!next.keepHeading) {
        chapters[current].title = cleanTitle(b.text)
        continue // the opening heading becomes the page title
      }
    }
    if (current < 0) current = 0 // safety: content before the first heading
    if (b.type === 'heading') {
      b.anchor = `${chapters[current].id}-${++seq}`
      b.text = cleanTitle(b.text) // drop stray trailing “-”, “‘-” marks from the print
    }
    chapters[current].blocks.push(b)
  }
  return chapters
}

export const allBlocks = stitch(parts)
export const chapters = splitChapters(allBlocks)

export function getChapter(id) {
  const i = chapters.findIndex((c) => c.id === id)
  if (i < 0) return null
  return { chapter: chapters[i], prev: chapters[i - 1] || null, next: chapters[i + 1] || null, index: i }
}
