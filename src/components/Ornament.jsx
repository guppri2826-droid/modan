import { useId } from 'react'

// Decorative SVG pieces used across the site (inline, no image files needed).

export function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="logo-mark"
    >
      <circle cx="32" cy="32" r="31" fill="var(--maroon)" />
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.6"
        strokeDasharray="2.6 2.6"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={32 + 29 * Math.cos((i * Math.PI) / 6)}
          cy={32 + 29 * Math.sin((i * Math.PI) / 6)}
          r="1.2"
          fill="var(--gold)"
        />
      ))}
      <text
        x="32"
        y="41.5"
        textAnchor="middle"
        fontFamily="'Tiro Devanagari Hindi', serif"
        fontSize="26"
        fill="var(--cream)"
      >
        मो
      </text>
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <div className={'divider ' + className} aria-hidden="true">
      <span className="divider-line" />
      <svg width="54" height="18" viewBox="0 0 54 18">
        <path d="M27 1 L31 9 L27 17 L23 9 Z" fill="var(--saffron)" />
        <circle cx="14" cy="9" r="2.4" fill="var(--gold)" />
        <circle cx="40" cy="9" r="2.4" fill="var(--gold)" />
        <circle cx="5" cy="9" r="1.4" fill="var(--gold)" />
        <circle cx="49" cy="9" r="1.4" fill="var(--gold)" />
      </svg>
      <span className="divider-line" />
    </div>
  )
}

// Large faint mandala for hero backgrounds
export function Mandala({ className = '' }) {
  const petals = 16
  return (
    <svg className={'mandala ' + className} viewBox="0 0 400 400" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="176" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="22" />
        {Array.from({ length: petals }).map((_, i) => (
          <g key={i} transform={`rotate(${(360 / petals) * i} 200 200)`}>
            <path d="M200 80 C 222 110, 222 150, 200 178 C 178 150, 178 110, 200 80 Z" />
            <path d="M200 24 C 214 44, 214 64, 200 80 C 186 64, 186 44, 200 24 Z" />
            <circle cx="200" cy="148" r="4" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ---------- Marigold toran (festive garland) ---------- */

function Marigold({ x, y, r = 6.5, tone = 'orange' }) {
  const petal = tone === 'orange' ? '#ea7414' : '#f4a90c'
  const core = tone === 'orange' ? '#f6a531' : '#fbd04b'
  const n = 11
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i * 2 * Math.PI) / n
        return (
          <circle
            key={i}
            cx={x + Math.cos(a) * r * 0.6}
            cy={y + Math.sin(a) * r * 0.6}
            r={r * 0.48}
            fill={petal}
          />
        )
      })}
      <circle cx={x} cy={y} r={r * 0.62} fill={core} />
      <circle cx={x} cy={y} r={r * 0.22} fill="#b4470c" />
    </g>
  )
}

const TW = 132 // tile width
// quadratic swag from (0,8) via (66,46) to (132,8)
const swag = (t) => [2 * (1 - t) * t * 66 + t * t * TW, (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 46 + t * t * 8]

export function Toran({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const flowers = [0.14, 0.28, 0.42, 0.58, 0.72, 0.86]
  return (
    <svg className={'toran ' + className} width="100%" height="78" aria-hidden="true">
      <defs>
        <pattern id={`toran-${id}`} width={TW} height="78" patternUnits="userSpaceOnUse">
          {/* string */}
          <path d={`M0 8 Q66 46 ${TW} 8`} fill="none" stroke="#7c3a0c" strokeWidth="1.2" />
          {/* hanging mango leaf + bud */}
          <line x1="66" y1="27" x2="66" y2="44" stroke="#7c3a0c" strokeWidth="1" />
          <path d="M66 42 C 74 50, 74 62, 66 74 C 58 62, 58 50, 66 42 Z" fill="#3f7f36" />
          <path d="M66 44 L66 72" stroke="#2c5e27" strokeWidth="0.9" />
          {/* side leaves */}
          <path d="M20 14 C 26 20, 26 30, 21 38 C 15 30, 15 20, 20 14 Z" fill="#4c8f3f" />
          <path d="M112 14 C 118 20, 118 30, 113 38 C 107 30, 107 20, 112 14 Z" fill="#4c8f3f" />
          {flowers.map((t, i) => {
            const [x, y] = swag(t)
            return <Marigold key={i} x={x} y={y} r={6.4} tone={i % 2 ? 'yellow' : 'orange'} />
          })}
          {/* cluster at the tile joint (drawn on both edges so halves meet) */}
          <Marigold x={0} y={8} r={9} tone="orange" />
          <Marigold x={TW} y={8} r={9} tone="orange" />
        </pattern>
      </defs>
      <rect width="100%" height="78" fill={`url(#toran-${id})`} />
    </svg>
  )
}

/* ---------- Wave edge at the bottom of dark banners ---------- */

export function Wave({ className = '', fill = 'var(--bg)' }) {
  return (
    <svg className={'wave ' + className} viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,34 C180,8 360,8 540,26 C720,44 900,50 1080,32 C1230,17 1340,14 1440,22 L1440,56 L0,56 Z"
        fill={fill}
      />
    </svg>
  )
}

/* ---------- Hero emblem ---------- */

export function Emblem() {
  const id = useId().replace(/:/g, '')
  const petals = 16
  return (
    <svg className="emblem" viewBox="0 0 440 440" role="img" aria-label="मोदनवाल एक्जीक्यूटिव क्लब">
      <defs>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffcf6b" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#e0a53a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e0a53a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c4" />
          <stop offset="50%" stopColor="#f0bd4c" />
          <stop offset="100%" stopColor="#c9861f" />
        </linearGradient>
        <linearGradient id={`petal-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f39a3a" />
          <stop offset="100%" stopColor="#b8421a" />
        </linearGradient>
        <radialGradient id={`disc-${id}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#8e2634" />
          <stop offset="100%" stopColor="#3f0c16" />
        </radialGradient>
      </defs>

      <circle cx="220" cy="220" r="220" fill={`url(#glow-${id})`} />

      {/* slow-turning outer ring */}
      <g className="emblem-spin">
        <circle cx="220" cy="220" r="200" fill="none" stroke="#e0a53a" strokeOpacity="0.55" strokeWidth="1.2" />
        <circle cx="220" cy="220" r="186" fill="none" stroke="#e0a53a" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 7" />
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i * 2 * Math.PI) / 48
          return (
            <circle
              key={i}
              cx={220 + 193 * Math.cos(a)}
              cy={220 + 193 * Math.sin(a)}
              r={i % 4 === 0 ? 3 : 1.5}
              fill="#f0bd4c"
              fillOpacity={i % 4 === 0 ? 0.95 : 0.6}
            />
          )
        })}
      </g>

      {/* lotus petals */}
      {Array.from({ length: petals }).map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals) * i} 220 220)`}>
          <path
            d="M220 46 C 244 76, 248 112, 220 142 C 192 112, 196 76, 220 46 Z"
            fill={`url(#petal-${id})`}
            stroke="#f6cf72"
            strokeWidth="1.4"
          />
          <path d="M220 70 C 230 88, 230 110, 220 126" fill="none" stroke="#ffd98a" strokeOpacity="0.55" strokeWidth="1" />
        </g>
      ))}
      {Array.from({ length: petals }).map((_, i) => (
        <g key={'s' + i} transform={`rotate(${(360 / petals) * i + 360 / petals / 2} 220 220)`}>
          <path
            d="M220 86 C 236 106, 238 128, 220 150 C 202 128, 204 106, 220 86 Z"
            fill="#7a1f2b"
            stroke="#f0bd4c"
            strokeWidth="1.2"
          />
        </g>
      ))}

      {/* centre medallion */}
      <circle cx="220" cy="220" r="96" fill={`url(#disc-${id})`} stroke={`url(#gold-${id})`} strokeWidth="5" />
      <circle cx="220" cy="220" r="84" fill="none" stroke="#f0bd4c" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 5" />
      <text
        x="220"
        y="246"
        textAnchor="middle"
        fontFamily="'Tiro Devanagari Hindi', serif"
        fontSize="92"
        fill={`url(#gold-${id})`}
      >
        मो
      </text>
      <text
        x="220"
        y="284"
        textAnchor="middle"
        fontFamily="'Tiro Devanagari Hindi', serif"
        fontSize="17"
        fill="#f6d68e"
        letterSpacing="1"
      >
        जय मोदनसेन
      </text>
    </svg>
  )
}

/* ---------- Diya (lamp) illustration ---------- */

export function Diya({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={'diya ' + className} viewBox="0 0 300 320" aria-hidden="true">
      <defs>
        <radialGradient id={`dglow-${id}`} cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#ffd76e" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#f39a3a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f39a3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`flame-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6a1a" />
          <stop offset="55%" stopColor="#ffb02e" />
          <stop offset="100%" stopColor="#ffe9a0" />
        </linearGradient>
        <linearGradient id={`clay-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e07b2a" />
          <stop offset="100%" stopColor="#8a2f10" />
        </linearGradient>
        <linearGradient id={`lotus-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6cf72" />
          <stop offset="100%" stopColor="#c98a22" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="134" r="124" fill={`url(#dglow-${id})`} />
      {/* rays */}
      <g stroke="#ffd76e" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = -Math.PI + (i * Math.PI) / 11
          return (
            <line
              key={i}
              x1={150 + 70 * Math.cos(a)}
              y1={118 + 70 * Math.sin(a)}
              x2={150 + 108 * Math.cos(a)}
              y2={118 + 108 * Math.sin(a)}
            />
          )
        })}
      </g>

      {/* flame */}
      <g className="diya-flame">
        <path d="M150 38 C 172 72, 180 100, 150 132 C 120 100, 128 72, 150 38 Z" fill={`url(#flame-${id})`} />
        <path d="M150 74 C 160 92, 162 106, 150 124 C 138 106, 140 92, 150 74 Z" fill="#fff6d2" />
      </g>
      <line x1="150" y1="128" x2="150" y2="142" stroke="#4a2410" strokeWidth="3" strokeLinecap="round" />

      {/* lamp */}
      <path d="M62 146 C 72 200, 228 200, 238 146 Z" fill={`url(#clay-${id})`} />
      <ellipse cx="150" cy="146" rx="88" ry="15" fill="#f0a04b" />
      <ellipse cx="150" cy="147" rx="74" ry="9" fill="#7a2c0c" />
      <g fill="#ffd98a">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={86 + i * 16} cy={168 + Math.sin((i / 8) * Math.PI) * 9} r="2.6" />
        ))}
      </g>

      {/* lotus base */}
      <g fill={`url(#lotus-${id})`} stroke="#7a1f2b" strokeOpacity="0.35" strokeWidth="1">
        <path d="M150 196 C 120 206, 92 230, 80 262 C 110 260, 136 240, 150 214 Z" />
        <path d="M150 196 C 180 206, 208 230, 220 262 C 190 260, 164 240, 150 214 Z" />
        <path d="M150 190 C 128 214, 126 246, 150 276 C 174 246, 172 214, 150 190 Z" />
        <path d="M150 210 C 118 222, 72 236, 46 252 C 84 272, 128 262, 150 238 Z" opacity="0.85" />
        <path d="M150 210 C 182 222, 228 236, 254 252 C 216 272, 172 262, 150 238 Z" opacity="0.85" />
      </g>
      <ellipse cx="150" cy="292" rx="96" ry="8" fill="#000" opacity="0.18" />
    </svg>
  )
}
