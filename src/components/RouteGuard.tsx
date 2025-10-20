import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWalletAuth } from '@/hooks/use-wallet-auth'
import { useToast } from '@/hooks/use-toast'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  showToast?: boolean
}

export function RouteGuard({ 
  children, 
  requireAuth = false, 
  redirectTo = '/auth',
  showToast = true 
}: RouteGuardProps) {
  const { isWalletAuthenticated } = useWalletAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    if (requireAuth && !isWalletAuthenticated) {
      if (showToast) {
        toast({
          title: "Authentication Required",
          description: "Please connect your Base Wallet to access this page",
          variant: "destructive",
        })
      }
      
      // Store the attempted route for redirect after auth
      const returnTo = location.pathname + location.search
      navigate(`${redirectTo}?returnTo=${encodeURIComponent(returnTo)}`)
    }
  }, [requireAuth, isWalletAuthenticated, navigate, redirectTo, location, toast, showToast])

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !isWalletAuthenticated) {
    return null
  }

  return <>{children}</>
}

// Hook to handle return navigation after authentication
export function useAuthReturn() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleAuthSuccess = () => {
    const params = new URLSearchParams(location.search)
    const returnTo = params.get('returnTo')
    
    if (returnTo) {
      navigate(decodeURIComponent(returnTo))
    } else {
      navigate('/')
    }
  }

  return { handleAuthSuccess }
}