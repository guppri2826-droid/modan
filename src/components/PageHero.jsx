import { Mandala, Toran, Wave } from './Ornament.jsx'
import Medallion from './Medallion.jsx'

export default function PageHero({ eyebrow, title, subtitle, icon, children }) {
  return (
    <section className="page-hero">
      <Toran className="page-toran" />
      <Mandala className="page-hero-mandala" />
      <div className={'container page-hero-inner' + (icon ? ' has-art' : '')}>
        <div className="page-hero-copy">
          {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
          {children}
        </div>
        {icon && <Medallion icon={icon} className="page-hero-art" />}
      </div>
      <Wave className="hero-wave" />
    </section>
  )
}
