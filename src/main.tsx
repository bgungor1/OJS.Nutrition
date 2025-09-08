import { StrictMode } from 'react'
// import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Home from './routes/home/home'
import { ThemeProvider } from './components/theme-provider'
import ProductDetail from './routes/product-detail/product-detail'
import Contact from './routes/contact/contact'
import FAQ from './routes/faq/faq'
import LoginPage from './routes/login/login-page'
import RegisterPage from './routes/register/register-page'
import Account from './routes/account/account'
import About from './routes/about/about'
import Addresses from './routes/account/addresses'
import Order from './routes/account/order'
import Settings from './routes/account/settings'
import Payment from './routes/payment/payment'

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
