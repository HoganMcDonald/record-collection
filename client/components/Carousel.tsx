import React from 'react'
import styled from 'styled-components'

import { Album, Artist, Track } from './../types'
import { AdvanceCarousel, RetreatCarousel } from './icons'
import { ResetButton } from './styled'
import Tile from './Tile'

const COLUMNS = 4

const CarouselContainer = styled.div``

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  grid-column-gap: 1.5rem;
`

const Control = styled(ResetButton)`
  line-height: 0;
  padding: 0 0.625rem;
`

const Controls = styled.div`
  height: 1rem;
`

const Title = styled.h2`
  margin: 0;
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.625rem;
`

export type CarouselItem = Album | Artist | Track

interface CarouselProps {
  title: string
  items: CarouselItem[]
}

const Carousel: React.FC<CarouselProps> = ({ items, title }) => {
  const [offset, setOffset] = React.useState<number>(0)
  const currentItems = items.slice(offset, offset + COLUMNS)

  function advanceOffset() {
    setOffset(Math.min(offset + COLUMNS, items.length - 1))
  }

  function retreatOffset() {
    setOffset(Math.max(offset - COLUMNS, 0))
  }

  React.useEffect(() => {
    setOffset(0)
  }, [items])

  return (
    <CarouselContainer>
      <TitleRow>
        <Title>{title}</Title>
        <Controls>
          <Control onClick={retreatOffset}>
            <RetreatCarousel disabled={offset === 0} />
          </Control>
          <Control onClick={advanceOffset}>
            <AdvanceCarousel disabled={offset === items.length - 1} />
          </Control>
        </Controls>
      </TitleRow>
      <ContentRow>
        {currentItems.map((item, i) => (
          <Tile item={item} key={i} />
        ))}
      </ContentRow>
    </CarouselContainer>
  )
}

export default Carousel
