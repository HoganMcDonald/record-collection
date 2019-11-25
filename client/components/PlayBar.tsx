import * as React from 'react'
import styled from 'styled-components'

import { Play, Speaker, PreviousSong, NextSong } from './icons'
import { ResetButton } from './styled'

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const ControlButton = styled(ResetButton)`
  margin: 0 12px;
`

const PlayBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
  background-color: ${({ theme }) => theme.colors.playBar};
  padding: 10px;
  position: relative;
`

const ProgressBar = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  transform: translateY(-50%);
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.colors.progressBar};
  border-bottom-right-radius: 999px;
  border-top-right-radius: 999px;
`

const NowPlaying = styled.div``

const PlayBar: React.FC = () => (
  <PlayBarContainer>
    <ProgressBar progress={43} />
    <NowPlaying />
    <Controls>
      <ControlButton>
        <PreviousSong />
      </ControlButton>
      <ControlButton>
        <Play />
      </ControlButton>
      <ControlButton>
        <NextSong />
      </ControlButton>
    </Controls>
    <Speaker />
  </PlayBarContainer>
)

export default PlayBar
