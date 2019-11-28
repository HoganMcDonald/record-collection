import { NextPage } from 'next'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Background } from '../components/styled'
import SpotifyLogo from '../components/SpotifyLogo'
import Button from '../components/Button'
import { apiUrl } from '../constants'

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

const Login: NextPage = () => {
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

export default Login
