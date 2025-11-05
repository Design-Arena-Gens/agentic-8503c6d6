"use client"

import { useCart } from '../../context/CartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState('')

  const taxRate = 0.08
  const shipping = items.length ? 7.99 : 0
  const taxes = subtotal * taxRate
  const total = subtotal + taxes + shipping

  const placeOrder = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: { name, email, address } })
      })
      const data = await res.json()
      if (res.ok) {
        setOrderId(data.orderId || '')
        setStatus('success')
        clear()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!items.length && status !== 'success') {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div>
        <h1>Thank you!</h1>
        <p>Your order has been placed successfully.</p>
        {orderId ? <p>Order ID: <strong>{orderId}</strong></p> : null}
      </div>
    )
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <form className="form" onSubmit={placeOrder}>
          <input className="input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
          <input className="input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <textarea className="input" placeholder="Shipping address" value={address} onChange={e => setAddress(e.target.value)} rows={4} required />
          <button className="btn" disabled={status==='loading'}>{status==='loading' ? 'Placing order?' : 'Place order'}</button>
        </form>
        <div className="card">
          <div className="card-inner">
            <h3>Order summary</h3>
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label={`Taxes (${(taxRate*100).toFixed(0)}%)`} value={`$${taxes.toFixed(2)}`} />
              <Row label="Shipping" value={`$${shipping.toFixed(2)}`} />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  )
}
