import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { CartProvider } from '../context/CartContext'

export const metadata = {
  title: 'StyleHub - Modern Clothing Store',
  description: 'Discover curated fashion with a seamless shopping experience.'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="container">{children}</main>
          <footer className="footer">? {new Date().getFullYear()} StyleHub</footer>
        </CartProvider>
      </body>
    </html>
  )
}
