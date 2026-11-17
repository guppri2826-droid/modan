import { useId } from 'react'
import Icon from './Icons.jsx'

// Lotus medallion with an icon in the centre — decorates inner-page banners.
export default function Medallion({ icon, className = '' }) {
  const id = useId().replace(/:/g, '')
  const petals = 12
  return (
    <svg className={'medallion ' + className} viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <radialGradient id={`mg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffcf6b" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#e0a53a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#e0a53a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`mp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f39a3a" />
          <stop offset="100%" stopColor="#b8421a" />
        </linearGradient>
        <linearGradient id={`mgold-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c4" />
          <stop offset="55%" stopColor="#f0bd4c" />
          <stop offset="100%" stopColor="#c9861f" />
        </linearGradient>
        <radialGradient id={`md-${id}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#8e2634" />
          <stop offset="100%" stopColor="#3f0c16" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="150" r="150" fill={`url(#mg-${id})`} />
      <g className="medallion-spin">
        <circle cx="150" cy="150" r="138" fill="none" stroke="#e0a53a" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 6" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 2 * Math.PI) / 24
          return (
            <circle
              key={i}
              cx={150 + 130 * Math.cos(a)}
              cy={150 + 130 * Math.sin(a)}
              r={i % 3 === 0 ? 2.6 : 1.3}
              fill="#f0bd4c"
              fillOpacity="0.8"
            />
          )
        })}
      </g>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          transform={`rotate(${(360 / petals) * i} 150 150)`}
          d="M150 30 C 168 54, 170 82, 150 104 C 130 82, 132 54, 150 30 Z"
          fill={`url(#mp-${id})`}
          stroke="#f6cf72"
          strokeWidth="1.2"
        />
      ))}
      <circle cx="150" cy="150" r="64" fill={`url(#md-${id})`} stroke={`url(#mgold-${id})`} strokeWidth="4" />
      <circle cx="150" cy="150" r="55" fill="none" stroke="#f0bd4c" strokeOpacity="0.55" strokeDasharray="2 4" />
      <Icon name={icon} size={64} x={118} y={118} strokeWidth={1.4} style={{ color: '#f6d68e' }} />
    </svg>
  )
}
