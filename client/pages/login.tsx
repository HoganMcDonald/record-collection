import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Background } from '../components/styled'
import SpotifyLogo from '../components/SpotifyLogo'
import Button from '../components/Button'
import { apiUrl } from '../constants'
import { AuthToken } from '../types'
import { useAuth } from '../reducers/auth'
import { isEnv } from '../lib/helpers'

const GlobalStyles = createGlobalStyle`
  html, body, #__next {
    height: 100vh;
  }
`

const SignInLogo = styled(SpotifyLogo)`
  height: 100%;
  margin-right: 0.5rem;
`

const SignInButton = styled(Button)`
  padding-right: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
`

interface LoginInitialProps {
  authToken?: AuthToken
}

const Login: NextPage<LoginInitialProps> = ({ authToken }) => {
  const { setAuthToken, loggedIn } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isEnv('server')) return
    if (!!authToken) {
      if (!loggedIn) setAuthToken(authToken)
      router.replace('/')
    }
  }, [])

  return (
    <Background>
      <GlobalStyles />
      <h1>Log in to get started.</h1>
      <SignInButton label="Log in with Spotify" href={`${apiUrl}/auth/spotify`}>
        <SignInLogo />
        Log in with Spotify
      </SignInButton>
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

Login.getInitialProps = async ({
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

export default Login
