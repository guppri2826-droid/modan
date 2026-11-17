// Renders the structured content blocks produced from the PDF transcription.
// Block shapes: heading{level,text} | p{text} | shloka{lines[]} | ol{items[],start?}

export default function Blocks({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return b.level === 1 ? (
              <h2 key={i} id={b.anchor} className="prose-h2">
                {b.text}
              </h2>
            ) : (
              <h3 key={i} id={b.anchor} className="prose-h3">
                {b.text}
              </h3>
            )
          case 'shloka':
            return (
              <blockquote key={i} className="shloka">
                {b.lines.map((line, j) => (
                  <span key={j} className="shloka-line">
                    {line}
                  </span>
                ))}
              </blockquote>
            )
          case 'ol':
            return (
              <ol key={i} className="prose-ol" start={b.start || 1}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )
          case 'note':
            return (
              <p key={i} className="prose-note">
                {b.text}
              </p>
            )
          default:
            return (
              <p key={i} className={isMeaning(b.text) ? 'meaning' : undefined}>
                {b.text}
              </p>
            )
        }
      })}
    </div>
  )
}

// “अर्थात् …” and “मंत्रार्थ …” paragraphs explain the verse above them;
// they get a subtle accent so readers can tell verse, meaning and narrative apart.
function isMeaning(text = '') {
  const t = text.trim().replace(/^\(/, '')
  return t.startsWith('अर्थात्') || t.startsWith('मंत्रार्थ') || t.startsWith('मन्त्रार्थ')
}
