import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '../reducers/auth'

const Authenticator: React.FC = ({ children }) => {
  const router = useRouter()
  const { loggedIn } = useAuth()

  React.useEffect(() => {
    if (router.pathname === '/login') {
      if (loggedIn) router.replace('/')
    } else if (!loggedIn) {
      router.replace('/login')
    }
  }, [router.pathname, loggedIn])

  return <>{children}</>
}

export default Authenticator
