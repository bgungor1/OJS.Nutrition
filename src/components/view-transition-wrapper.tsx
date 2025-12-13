import { type ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface ViewTransitionWrapperProps {
  children: ReactNode
}

// View Transition API tipi
interface ViewTransition {
  startViewTransition: (callback: () => void) => void
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition
  }
}

export default function ViewTransitionWrapper({ children }: ViewTransitionWrapperProps) {
  const location = useLocation()

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
      })
    }
  }, [location.pathname])

  return <>{children}</>
}

