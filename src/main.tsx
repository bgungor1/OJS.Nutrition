import { StrictMode } from 'react'
// import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import { ThemeProvider } from './components/theme-provider'

// Barrel Export - Tüm route'lar tek seferde import ediliyor
import {
  Home,
  About,
  Contact,
  FAQ,
  Products,
  Protein,
  LoginPage,
  Account,
  Addresses,
  Order,
  Payment
} from './routes'
import ProductDetail from './routes/product-detail/product-detail'

import {bestSellersApi} from './services/best-sellers'
import { productsLoader } from './routes/products/loader'

const homeLoader = async () => {
  console.log('🚀 Loader çalışıyor!')
  
  try {
    console.log('📡 API çağrısı yapılıyor...')
    const response = await bestSellersApi.getBestSellers()
    console.log('✅ API başarılı:', response)
    
    // API response'undan data kısmını al
    const bestSellers = response.data || []
    console.log('📦 Best sellers data:', bestSellers)
    
    return {
      bestSellers
    }
  } catch (error) {
    console.error('❌ API hatası:', error)
    return {
      bestSellers: []
    }
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "product/:id",
        element: <ProductDetail/>
      },
      {
        path: "products",
        element: <Products/>,
        loader: productsLoader
      },
      {
        path: "products/protein",
        element: <Protein/>
      },
      {
        path: "contact",
        element: <Contact/>
      },
      {
        path: "faq",
        element: <FAQ/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "account",
        element: <Account/>,
        children: [
          {
            path: "addresses",
            element: <Addresses/>
          },
          {
            path: "order",
            element: <Order/>
          }
        ]
      }
    ]
  },
  // Payment sayfası Layout dışında, navbar olmadan
  {
    path: "payment",
    element: <Payment/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ojs-nutrition-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
