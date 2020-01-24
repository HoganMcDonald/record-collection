import * as React from 'react'
import styled from 'styled-components'

import { Background } from './styled'
import PlayBar from './PlayBar'
import Toasts from './Toasts'

const FullScreenContainer = styled.div`
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 1fr 60px;
`

const SideBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.sideBar};
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
      <PlayBar />
      <Toasts />
    </FullScreenContainer>
  )
}

export default Layout
