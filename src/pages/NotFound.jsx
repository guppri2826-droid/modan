import { Link } from '../router.jsx'
import PageHero from '../components/PageHero.jsx'

export default function NotFound() {
  return (
    <>
      <PageHero title="पृष्ठ नहीं मिला" subtitle="आप जिस पृष्ठ को खोज रहे हैं वह उपलब्ध नहीं है।" />
      <section className="section">
        <div className="container center">
          <Link to="/" className="btn btn-primary">मुख्य पृष्ठ पर जाएँ</Link>
        </div>
      </section>
    </>
  )
}
