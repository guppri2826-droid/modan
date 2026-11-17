import { Link } from '../router.jsx'
import { Logo } from './Ornament.jsx'
import { CLUB_NAME, GREETING } from '../content/club.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size={52} />
          <div>
            <p className="footer-name">{CLUB_NAME}</p>
            <p className="footer-tag">
              सभी स्वजातीय अधिकारी / प्रोफैशनल बंधुओं का एक साझा मंच
            </p>
          </div>
        </div>

        <div>
          <p className="footer-title">पृष्ठ</p>
          <ul className="footer-links">
            <li><Link to="/uddeshya">उद्देश्य एवं संरचना</Link></li>
            <li><Link to="/sadasyata">सदस्यता के नियम</Link></li>
            <li><Link to="/aavedan">सदस्यता आवेदन पत्र</Link></li>
            <li><Link to="/itihas">इतिहास एवं संस्कार</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-title">सदस्यता</p>
          <p className="footer-note">
            वर्तमान में सदस्यता शुल्क निर्धारित नहीं है — रजिस्ट्रेशन <strong>निःशुल्क</strong> है।
          </p>
          <p className="footer-greet">{GREETING}</p>
        </div>
      </div>
      <div className="footer-base">
        <div className="container">© {new Date().getFullYear()} {CLUB_NAME}</div>
      </div>
    </footer>
  )
}
