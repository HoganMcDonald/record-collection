import * as React from 'react'
import styled from 'styled-components'

import { Background } from './styled'

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 1fr 70px;
`

const SideBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`

const NowPlaying = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
`

const ScrollableBackground = styled(Background)`
  overflow-x: hidden;
  overflow-y: scroll;
`

const Layout: React.FC = ({ children }) => {
  return (
    <FullScreenContainer>
      <SideBar />
      <ScrollableBackground>{children}</ScrollableBackground>
      <NowPlaying />
    </FullScreenContainer>
  )
}

export default Layout
