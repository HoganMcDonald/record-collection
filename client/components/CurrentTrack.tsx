import * as React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Player } from '../reducers/player'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const AlbumCover = styled.img<{ playing: boolean }>`
  height: 100%;
  width: auto;
  border-radius: 999px;
  margin: 0;

  ${({ playing }) =>
    playing
      ? css`
          animation: ${spin} 8s linear infinite;
        `
      : null}
`

const ArtistName = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.gray};
`

const CurrentTrackContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: auto;
  flex: 1;
`

const TrackInfo = styled.div`
  margin-left: 0.75rem;
`

const TrackName = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.white};
`

interface CurrentTrackProps {
  nowPlaying: Player['nowPlaying']
  isPlaying: boolean
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({
  nowPlaying: { albumName, albumCover, trackName, artistName },
  isPlaying,
}) => {
  return (
    <CurrentTrackContainer>
      {albumName && (
        <>
          <AlbumCover
            playing={isPlaying}
            src={albumCover}
            alt={`Cover art for: ${albumName} by ${artistName}`}
          />
          <TrackInfo>
            <TrackName>{trackName}</TrackName>
            <ArtistName>{artistName}</ArtistName>
          </TrackInfo>
        </>
      )}
    </CurrentTrackContainer>
  )
}

export default CurrentTrack
