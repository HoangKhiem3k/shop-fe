// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { clearLocalUserData } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      return
    }
    if (auth.user === null && !window.localStorage.getItem(ACCESS_TOKEN) && !window.localStorage.getItem(USER_DATA)) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
      auth.setUser(null)
      clearLocalUserData()
    }
  }, [router.route])
  if (auth.loading || auth.user === null) {
    return fallback
  }
  return <>{children}</>
}

export default AuthGuard
