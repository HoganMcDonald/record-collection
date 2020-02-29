import * as React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { ResetButton } from './styled'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: ${({ theme }) => theme.colors.sideBar};
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  overflow-y: scroll;
`

const Header = styled.h3`
  margin: 1.5rem 1rem 1rem;
  color: ${({ theme }) => theme.colors.white};
`

const Link = styled(ResetButton)`
  width: 100%;
  padding: 0.5rem 1.5rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray};
  border: solid 2px ${({ theme }) => theme.colors.sideBar};
  transition: background 170ms ease-out, color 170ms ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sideBarLink};
    color: ${({ theme }) => theme.colors.white};
  }
`

const Sidebar: React.FC = () => {
  const history = useHistory()
  return (
    <Container>
      <InnerContainer>
        <Header>Discover:</Header>
        <Link onClick={() => history.push('/')}>Browse</Link>
        <Header>Collections:</Header>
        <Link onClick={() => history.push('/collection')}>All</Link>
      </InnerContainer>
    </Container>
  )
}

export default Sidebar
