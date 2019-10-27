import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { AuthToken } from '../types'
import { isEnv } from '../lib/helpers'
import { useAuth } from '../reducers/auth'
import { useUser } from '../reducers/users'
import { Background } from '../components/styled'

interface HomeInitialProps {
  authToken?: AuthToken
}

const Home: NextPage<HomeInitialProps> = ({ authToken }) => {
  const { setAuthToken, loggedIn } = useAuth()
  const { getMe } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    if (isEnv('server')) return
    if (!!authToken) {
      if (!loggedIn) setAuthToken(authToken)
      router.replace('/')
    }
  }, [])

  React.useEffect(() => {
    if (!authToken) {
      getMe()
    }
  }, [authToken])

  return (
    <Background>
      <h1>Logged in!</h1>
    </Background>
  )
}

interface Context extends NextPageContext {
  query: {
    uid?: string
    client?: string
    expiry?: string
    'access-token'?: string
  }
}

Home.getInitialProps = async ({
  query: { uid, client, expiry, 'access-token': accessToken },
}: Context) => {
  const tokenFromParams: AuthToken = {
    uid,
    client,
    expiry,
    'access-token': accessToken,
    'token-type': 'Bearer',
  }

  return { authToken: tokenFromParams.client ? tokenFromParams : null }
}

export default Home
