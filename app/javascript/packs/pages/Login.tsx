import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Background, PageStyles } from '../components/styled'
import SpotifyLogo from '../components/SpotifyLogo'
import Button from '../components/Button'
import { useUser } from '../reducers/users'

const GlobalStyles = createGlobalStyle`
  html, body, .App {
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

const Login: React.FC = () => {
  const history = useHistory()
  const { loggedIn } = useUser()

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [])

  return (
    <Background>
      <PageStyles />
      <GlobalStyles />
      <h1>Log in to get started.</h1>
      <SignInButton
        label="Log in with Spotify"
        href={`${window.location.origin}/users/auth/spotify`}>
        <SignInLogo />
        Log in with Spotify
      </SignInButton>
    </Background>
  )
}

export default Login
