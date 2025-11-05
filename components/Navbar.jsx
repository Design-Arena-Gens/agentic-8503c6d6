"use client"

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemsCount } = useCart()
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" href="/">StyleHub</Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart ({itemsCount})</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  )
}
