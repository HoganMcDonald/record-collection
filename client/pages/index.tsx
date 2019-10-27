import { NextPage, NextPageContext } from 'next'
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
  const { setAuthToken } = useAuth()
  const { getMe } = useUser()

  React.useEffect(() => {
    if (isEnv('server')) return

    if (!!authToken) {
      setAuthToken(authToken)
    } else {
      getMe()
    }
  }, [])

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
