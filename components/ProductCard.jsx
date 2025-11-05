"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image src={product.image} alt={product.name} width={600} height={600} style={{ width: '100%', height: 'auto' }} />
      </Link>
      <div className="card-inner">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => addItem(product)}>Add to cart</button>
          <Link className="btn secondary" href={`/product/${product.slug}`}>View</Link>
        </div>
      </div>
    </div>
  )
}
