import React from 'react'
import styled from 'styled-components'

import { Album, Artist, Track } from './../types'
import { AdvanceCarousel, RetreatCarousel } from './icons'
import { ResetButton } from './styled'
import Tile from './Tile'
import { isArtist } from '../lib/identifyCarouselItemType'

const CarouselContainer = styled.div`
  margin-bottom: 4rem;
`

const ContentRow = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 4}, 1fr);
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
  const columns = isArtist(items[0]) ? 8 : 4
  const currentItems = items.slice(offset, offset + columns)

  function advanceOffset() {
    setOffset(Math.min(offset + columns, items.length - 1))
  }

  function retreatOffset() {
    setOffset(Math.max(offset - columns, 0))
  }

  React.useEffect(() => {
    setOffset(0)
  }, [items])

  const retreatDisabled = offset === 0
  const advanceDisabled = offset + columns > items.length

  return (
    <CarouselContainer>
      <TitleRow>
        <Title>{title}</Title>
        <Controls>
          <Control onClick={retreatOffset} disabled={retreatDisabled}>
            <RetreatCarousel disabled={retreatDisabled} />
          </Control>
          <Control onClick={advanceOffset} disabled={advanceDisabled}>
            <AdvanceCarousel disabled={advanceDisabled} />
          </Control>
        </Controls>
      </TitleRow>
      <ContentRow columns={columns}>
        {currentItems.map((item, i) => (
          <Tile item={item} key={i} />
        ))}
      </ContentRow>
    </CarouselContainer>
  )
}

export default Carousel
