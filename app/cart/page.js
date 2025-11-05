"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart()

  if (!items.length) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <p>Discover items you love and add them to your cart.</p>
        <Link href="/" className="btn" style={{ display: 'inline-block', marginTop: 12 }}>Browse products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Shopping cart</h1>
      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th style={{ width: 80 }}>Item</th>
            <th>Name</th>
            <th>Price</th>
            <th style={{ width: 120 }}>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <Image src={item.image} alt={item.name} width={64} height={64} style={{ borderRadius: 8 }} />
              </td>
              <td>
                <Link href={`/product/${item.slug}`}>{item.name}</Link>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQty(item.id, e.target.value)}
                  style={{ width: 80 }}
                />
              </td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
              <td>
                <button className="btn danger" onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link className="btn secondary" href="/">Continue shopping</Link>
        <div>
          <div style={{ marginBottom: 8, textAlign: 'right' }}>
            <span style={{ color: 'var(--muted)', marginRight: 8 }}>Subtotal:</span>
            <span className="price">${subtotal.toFixed(2)}</span>
          </div>
          <Link className="btn" href="/checkout">Proceed to checkout</Link>
        </div>
      </div>
    </div>
  )
}
