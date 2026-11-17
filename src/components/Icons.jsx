// Simple line icons (24×24, currentColor).

const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const PATHS = {
  // chapters
  'jati-vyavastha': (
    <>
      <path d="M3 5.5h6a3 3 0 0 1 3 3V20a2.2 2.2 0 0 0-2.2-2.2H3z" />
      <path d="M21 5.5h-6a3 3 0 0 0-3 3V20a2.2 2.2 0 0 1 2.2-2.2H21z" />
    </>
  ),
  utpatti: (
    <>
      <path d="M12 19.5c-4.2 0-8-2.8-8-6.8 3.2 0 6 1.9 8 4.8 2-2.9 4.8-4.8 8-4.8 0 4-3.8 6.8-8 6.8z" />
      <path d="M12 17.5c-2.2-3-2.2-8.2 0-12.5 2.2 4.3 2.2 9.5 0 12.5z" />
    </>
  ),
  'janm-bhoomi': (
    <>
      <path d="M12 21s-7-6.4-7-11.2a7 7 0 0 1 14 0C19 14.6 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </>
  ),
  gotra: (
    <>
      <path d="M12 21v-8.5M12 12.5 6.5 7.5M12 12.5l5.5-5M12 9V4" />
      <circle cx="12" cy="3.5" r="1.5" />
      <circle cx="5.8" cy="6.8" r="1.5" />
      <circle cx="18.2" cy="6.8" r="1.5" />
    </>
  ),
  'dharm-sanskar': (
    <>
      <path d="M12 3c2.2 3 3.8 5 3.8 7.6a3.8 3.8 0 0 1-7.6 0C8.2 8 9.8 6 12 3z" />
      <path d="M4 16h16M6 16c.5 2.6 3 4.5 6 4.5s5.5-1.9 6-4.5" />
    </>
  ),
  upanayan: (
    <>
      <path d="M4 7.5c2.7-2.6 5.3 2.6 8 0s5.3 2.6 8 0" />
      <path d="M4 12c2.7-2.6 5.3 2.6 8 0s5.3 2.6 8 0" />
      <path d="M4 16.5c2.7-2.6 5.3 2.6 8 0s5.3 2.6 8 0" />
    </>
  ),
  sandhya: (
    <>
      <path d="M3 18.5h18M6.5 18.5a5.5 5.5 0 0 1 11 0" />
      <path d="M12 6.5V3.5M5.9 9.9 3.8 7.8M18.1 9.9l2.1-2.1M21 14h-2M5 14H3" />
    </>
  ),
  'sangh-shakti': (
    <>
      <circle cx="12" cy="7" r="2.6" />
      <circle cx="5.5" cy="9.5" r="2.1" />
      <circle cx="18.5" cy="9.5" r="2.1" />
      <path d="M7.5 20c0-2.8 2-5 4.5-5s4.5 2.2 4.5 5M2.5 18.5c0-2.2 1.4-3.8 3.2-3.8M21.5 18.5c0-2.2-1.4-3.8-3.2-3.8" />
    </>
  ),
  sudhar: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C12 8 9.2 5 4.5 5c0 4 3 7 7.5 7z" />
      <path d="M12 10.5c0-3.4 2.4-6 6.8-6 0 3.6-2.6 6-6.8 6z" />
    </>
  ),
  // facts / misc
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
      <path d="M3.5 13h17M12 9v11" />
      <path d="M12 9c-1.5-3.5-6-4-6-1.2C6 9 8.2 9 12 9zm0 0c1.5-3.5 6-4 6-1.2C18 9 15.8 9 12 9z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.8.3 5 2.6 5 5.8" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  meet: (
    <>
      <path d="M3 20h18" />
      <path d="M5 20V10l7-5 7 5v10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  rise: (
    <>
      <path d="M4 18l6-6 4 4 6-8" />
      <path d="M14 8h6v6" />
    </>
  ),
  crown: (
    <>
      <path d="M4 17.5 3 7.5l5 4 4-6 4 6 5-4-1 10z" />
      <path d="M4.5 20.5h15" />
    </>
  ),
  temple: (
    <>
      <path d="M12 2.5v2.5M8 9l4-4 4 4M6.5 9h11M7.5 9v4M16.5 9v4M5 13h14M6 13v7.5M18 13v7.5M3.5 20.5h17M10 20.5v-4h4v4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.6-4.5M4 3.5v4h4" />
      <path d="M4 13a8 8 0 0 0 14.6 4.5M20 20.5v-4h-4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.2 12.3l2.6 2.6 5-5.2" />
    </>
  ),
  pen: (
    <>
      <path d="M14.5 4.5l5 5L9 20H4v-5z" />
      <path d="M12.5 6.5l5 5" />
    </>
  ),
  idcard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2.2" />
      <path d="M5.5 16c.6-1.5 1.7-2.2 3-2.2s2.4.7 3 2.2M14 10h4M14 13.5h3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c0-4 3.4-7 7.5-7s7.5 3 7.5 7" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="6.5" r="2.4" />
      <circle cx="16" cy="6.5" r="2.4" />
      <circle cx="12" cy="13" r="1.9" />
      <path d="M3.5 18.5c0-3 2-5.3 4.5-5.3M20.5 18.5c0-3-2-5.3-4.5-5.3M9 20.5c0-2 1.3-3.6 3-3.6s3 1.6 3 3.6" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  chef: (
    <>
      <path d="M7 14.5V20h10v-5.5" />
      <path d="M7 14.5a4 4 0 0 1-1.2-7.8A4.5 4.5 0 0 1 12 4a4.5 4.5 0 0 1 6.2 2.7A4 4 0 0 1 17 14.5z" />
      <path d="M7 17h10" />
    </>
  ),
}

export default function Icon({ name, size = 26, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {PATHS[name] || null}
    </svg>
  )
}
