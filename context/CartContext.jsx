"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'stylehub_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p)
      }
      return [...prev, { id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image, quantity }]
    })
  }

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const updateQty = (id, quantity) => setItems(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, Number(quantity) || 1) } : p))
  const clear = () => setItems([])

  const itemsCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.quantity * i.price, 0), [items])

  const value = { items, addItem, removeItem, updateQty, clear, itemsCount, subtotal }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
