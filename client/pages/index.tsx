import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const Background = styled.body`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({theme}) => theme.colors.textPrimary};
`

const Home = () => <Background>record app</Background>

export default Home
