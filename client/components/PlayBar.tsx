import * as React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Play, Speaker, PreviousSong, NextSong, Pause } from './icons'
import { ResetButton } from './styled'
import { usePlayer } from '../reducers/player'
import { useInterval } from '../lib/useInterval'
import CurrentTrack from './CurrentTrack'

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

const PlayBar: React.FC = () => {
  const { playerStatus, getPlayerStatus } = usePlayer()

  React.useEffect(() => {
    getPlayerStatus()
  }, [])

  useInterval(
    () => {
      getPlayerStatus()
    },
    playerStatus.isPlaying ? 500 : 10000
  )

  const progress =
    playerStatus.trackDuration > 0
      ? (playerStatus.progress / playerStatus.trackDuration) * 100
      : 0

  return (
    <PlayBarContainer>
      <ProgressBar progress={progress} />
      <CurrentTrack
        nowPlaying={playerStatus.nowPlaying}
        isPlaying={playerStatus.isPlaying}
      />
      <Controls>
        <ControlButton>
          <PreviousSong />
        </ControlButton>
        <ControlButton onClick={getPlayerStatus}>
          {playerStatus.isPlaying ? <Pause /> : <Play />}
        </ControlButton>
        <ControlButton>
          <NextSong />
        </ControlButton>
      </Controls>
      <Speaker />
    </PlayBarContainer>
  )
}

export default PlayBar
