import * as React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Play, Speaker, PreviousSong, NextSong, Pause } from './icons'
import { ResetButton } from './styled'
import { usePlayer } from '../reducers/player'
import { useInterval } from '../lib/useInterval'
import CurrentTrack from './CurrentTrack'
import Progress from './Progress'

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const ControlButton = styled(ResetButton)`
  margin: 0 12px;
`

const DeviceButton = styled(ResetButton)`
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  flex: 1;
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

const PlayBar: React.FC = () => {
  const { playerStatus, getPlayerStatus, pause, play } = usePlayer()

  const handlePlayPause = () => (playerStatus.isPlaying ? pause() : play())

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
      <Progress
        progress={progress}
        onPlayHeadChange={position => console.log(position)}
      />
      <CurrentTrack
        nowPlaying={playerStatus.nowPlaying}
        isPlaying={playerStatus.isPlaying}
      />
      <Controls>
        <ControlButton>
          <PreviousSong />
        </ControlButton>
        <ControlButton onClick={handlePlayPause}>
          {playerStatus.isPlaying ? <Pause /> : <Play />}
        </ControlButton>
        <ControlButton>
          <NextSong />
        </ControlButton>
      </Controls>
      <DeviceButton>
        <Speaker />
      </DeviceButton>
    </PlayBarContainer>
  )
}

export default PlayBar
