import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './common/navbar'
import Footer from './common/footer'
import Chatbot from './chatbot'
import { productsApi } from '../services/products'
import { type ApiProduct } from '../types/api'

export default function Layout() {
  const [products, setProducts] = useState<ApiProduct[]>([])

  useEffect(() => {
    // Chatbot için ürünleri yükle
    const loadProducts = async () => {
      try {
        const response = await productsApi.getProducts({ page: 1, limit: 100 })
        setProducts(response.data.results || [])
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error)
        setProducts([])
      }
    }
    loadProducts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot products={products} />
    </div>
  )
} 