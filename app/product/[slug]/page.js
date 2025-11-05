"use client"

import Image from 'next/image'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { products } from '../../../lib/products'
import { useCart } from '../../../context/CartContext'

export default function ProductDetail({ params }) {
  const router = useRouter()
  const { addItem } = useCart()
  const product = useMemo(() => products.find(p => p.slug === params.slug), [params.slug])

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <button className="btn" onClick={() => router.push('/')}>Back to home</button>
      </div>
    )
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        <Image src={product.image} alt={product.name} width={900} height={900} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div>
        <h1 style={{ marginTop: 0 }}>{product.name}</h1>
        <p className="price" style={{ fontSize: 22 }}>${product.price.toFixed(2)}</p>
        <p style={{ marginTop: 8 }}>{product.description}</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button className="btn" onClick={() => addItem(product)}>Add to cart</button>
          <button className="btn secondary" onClick={() => router.push('/cart')}>Go to cart</button>
        </div>
      </div>
    </div>
  )
}
