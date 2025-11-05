import ProductCard from '../components/ProductCard'
import { products } from '../lib/products'

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>Elevate your style</h1>
        <p>Curated essentials for everyday comfort and confident looks.</p>
      </section>
      <section>
        <h2>Featured products</h2>
        <div className="grid" style={{ marginTop: 16 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
