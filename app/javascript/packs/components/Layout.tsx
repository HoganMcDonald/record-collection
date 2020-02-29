import * as React from 'react'
import styled from 'styled-components'

import { useUser } from '../reducers/users'
import { Background, PageStyles } from './styled'
import PlayBar from './PlayBar'
import Toasts from './Toasts'
import Sidebar from './Sidebar'
import { useCollections } from '../reducers/collection'

const FullScreenContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  height: 100vh;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 1fr 60px;
`

const ScrollableBackground = styled(Background)`
  overflow-x: hidden;
  overflow-y: scroll;
`

const Layout: React.FC = ({ children }) => {
  const { getMe, loggedIn } = useUser()
  const { getDefaultCollection } = useCollections()

  React.useEffect(() => {
    if (!loggedIn) {
      getMe()
      getDefaultCollection()
    }
  }, [loggedIn])

  return (
    <FullScreenContainer>
      <PageStyles />
      <Sidebar />
      <ScrollableBackground>{children}</ScrollableBackground>
      <PlayBar />
      <Toasts />
    </FullScreenContainer>
  )
}

export default Layout
