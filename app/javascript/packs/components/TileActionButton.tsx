import * as React from 'react'
import styled from 'styled-components'

import Button from './Button'

const Container = styled(Button)`
  position: absolute;
  width: 15%;
  height: 15%;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0;
  font-size: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 12px -3px ${({ theme }) => theme.colors.sideBar};
  color: ${({ theme }) => theme.colors.accent};
  transition: box-shadow 120ms ease-out, color 120ms ease-out;

  &:hover {
    box-shadow: 1px 3px 12px -3px ${({ theme }) => theme.colors.sideBar};
    color: white;
  }

  &:active {
    color: ${({ theme }) => theme.colors.accent};
  }
`

interface TileActionButtonProps {
  onAddToCollection: () => void
}

const TileActionButton: React.FC<TileActionButtonProps> = ({
  onAddToCollection,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCollection()
  }

  return (
    <Container label="Add to Collection" onClick={handleClick}>
      +
    </Container>
  )
}

export default TileActionButton
