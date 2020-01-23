import React from 'react'
import styled from 'styled-components'

import { Album, Artist, Track } from './../types'
import { AdvanceCarousel, RetreatCarousel } from './icons'
import { ResetButton } from './styled'

const CarouselContainer = styled.div``

const ContentRow = styled.div`
  border: solid 1px black;
`

const Control = styled(ResetButton)`
  line-height: 0;
  padding: 0 0.625rem;
`

const Controls = styled.div`
  height: 1rem;
  margin-bottom: 0.625rem;
`

const Title = styled.h2`
  margin: 0;
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type CarouselItem = Album | Artist | Track

interface CarouselProps {
  title: string
  items: CarouselItem[]
}

const Carousel: React.FC<CarouselProps> = ({ items, title }) => {
  const [offset, setOffset] = React.useState<number>(0)

  function advanceOffset() {
    setOffset(Math.min(offset + 4, items.length - 1))
  }

  function retreatOffset() {
    setOffset(Math.max(offset - 4, 0))
  }

  return (
    <CarouselContainer>
      <TitleRow>
        <Title>{title}</Title>
        <Controls>
          <Control onClick={retreatOffset}>
            <RetreatCarousel />
          </Control>
          <Control onClick={advanceOffset}>
            <AdvanceCarousel />
          </Control>
        </Controls>
      </TitleRow>
      <ContentRow></ContentRow>
    </CarouselContainer>
  )
}

export default Carousel
