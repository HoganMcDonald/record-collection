import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import SpotifyLogo from '../components/SpotifyLogo'
import Button from '../components/Button'

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

const Home = () => (
  <Background>
    <h1>Log in to get started.</h1>
    <SignInButton label="Log in sith Spotify">
      <SignInLogo />
      Log in with Spotify
    </SignInButton>
  </Background>
)

export default Home
