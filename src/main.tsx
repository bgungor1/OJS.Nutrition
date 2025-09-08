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
  ProductDetail,
  LoginPage,
  RegisterPage,
  Account,
  Addresses,
  Order,
  Settings,
  Payment
} from './routes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "product/:id",
        element: <ProductDetail/>
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
        path: "register",
        element: <RegisterPage/>
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
            index: true,
            element: <Account/>
          },
          {
            path: "addresses",
            element: <Addresses/>
          },
          {
            path: "order",
            element: <Order/>
          },
          {
            path: "settings",
            element: <Settings/>
          }
        ]
      },
      {
        path: "payment",
        element: <Payment/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ojs-nutrition-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
