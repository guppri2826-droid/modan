// Gently falling marigold petals (decorative, behind hero content).
// Positions are fixed (not random) so the layout is stable between renders.
const PETALS = [
  { left: 4, delay: 0, dur: 13, size: 12, hue: 'o' },
  { left: 11, delay: 6, dur: 16, size: 9, hue: 'y' },
  { left: 19, delay: 2.5, dur: 14, size: 11, hue: 'o' },
  { left: 27, delay: 9, dur: 17, size: 8, hue: 'y' },
  { left: 35, delay: 4, dur: 15, size: 12, hue: 'o' },
  { left: 43, delay: 11, dur: 13, size: 9, hue: 'y' },
  { left: 51, delay: 1, dur: 18, size: 10, hue: 'o' },
  { left: 59, delay: 7.5, dur: 14, size: 12, hue: 'y' },
  { left: 66, delay: 3, dur: 16, size: 9, hue: 'o' },
  { left: 73, delay: 10, dur: 15, size: 11, hue: 'y' },
  { left: 80, delay: 5, dur: 13, size: 8, hue: 'o' },
  { left: 87, delay: 12, dur: 17, size: 12, hue: 'y' },
  { left: 94, delay: 2, dur: 15, size: 10, hue: 'o' },
]

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal-fall"
          style={{ left: `${p.left}%`, animationDelay: `-${p.delay}s`, animationDuration: `${p.dur}s` }}
        >
          <span
            className={`petal petal-${p.hue}`}
            style={{ width: p.size, height: p.size * 1.35, animationDelay: `${p.delay / 2}s` }}
          />
        </span>
      ))}
    </div>
  )
}
