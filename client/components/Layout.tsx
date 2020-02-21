import * as React from 'react'
import styled from 'styled-components'

import { useAuth } from '../reducers/auth'
import { useUser } from '../reducers/users'
import { Background } from './styled'
import PlayBar from './PlayBar'
import Toasts from './Toasts'
import Sidebar from './Sidebar'
import { useCollections } from '../reducers/collection'

const FullScreenContainer = styled.div`
  min-width: 1000px;
  width: 100vw;
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
  const { authToken } = useAuth()
  const { getMe } = useUser()
  const { getDefaultCollection } = useCollections()

  React.useEffect(() => {
    getMe()
    getDefaultCollection()
  }, [])

  React.useEffect(() => {
    if (!authToken) {
      getMe()
    }
  }, [authToken])

  return (
    <FullScreenContainer>
      <Sidebar />
      <ScrollableBackground>{children}</ScrollableBackground>
      <PlayBar />
      <Toasts />
    </FullScreenContainer>
  )
}

export default Layout
