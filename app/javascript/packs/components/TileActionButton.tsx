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
  color: ${({ theme }) => theme.colors.accent};
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
