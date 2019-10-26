import { NextPage, NextPageContext } from 'next'
import React from 'react'
import styled from 'styled-components'

import SpotifyLogo from '../components/SpotifyLogo'
import Button from '../components/Button'
import { useApiRequests } from '../lib/apiHelpers'
import { AuthToken } from '../types'
import { isEnv } from '../lib/helpers'
import { useAuth } from '../reducers/auth'

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const SignInLogo = styled(SpotifyLogo)`
  height: 100%;
  margin-right: 0.5rem;
`

const SignInButton = styled(Button)`
  padding-right: 0.75rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

interface HomeInitialProps {
  authToken: AuthToken
}

const Home: NextPage<HomeInitialProps> = ({ authToken }) => {
  const titleText = 'Log in to get started.'
  const [title, setTitle] = React.useState('')
  const { setAuthToken } = useAuth()
  const { get } = useApiRequests()

  React.useEffect(() => {
    if (isEnv('client') && window.location.search) {
      setAuthToken(authToken)
      window.location.search = ''
    }
  }, [])

  React.useLayoutEffect(() => {
    setTimeout(() => {
      if (title !== titleText) {
        setTitle(titleText.substring(0, title.length + 1))
      }
    }, 15)
  }, [title])

  return (
    <Background>
      <h1>{title}</h1>
      <SignInButton
        label="Log in with Spotify"
        href={'http://localhost:3001/auth/spotify'}>
        <SignInLogo />
        Log in with Spotify
      </SignInButton>
      <Button label="test" onClick={() => get('/me')}>
        test
      </Button>
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
  const authToken: AuthToken = {
    uid,
    client,
    expiry,
    'access-token': accessToken,
    'token-type': 'Bearer',
  }

  return { authToken }
}

export default Home
