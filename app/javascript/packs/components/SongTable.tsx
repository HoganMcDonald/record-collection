import * as React from 'react'
import styled, { css } from 'styled-components'

import { Track } from '../types'

const PADDING = '0.5rem 0.8rem 0.4rem'

const bodyHoverStyles = css`
  background-color: ${({ theme }) => theme.colors.accentDark};
  color: ${({ theme }) => theme.colors.white};
`

const BodyCell = styled.td<{ hover?: boolean }>`
  line-height: 0;
  color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 60ms ease-in, color 60ms ease-in;
  padding: ${PADDING};

  ${({ hover }) => hover && bodyHoverStyles}
`

const BodyRow = styled.tr`
  cursor: pointer;
  padding-bottom: 0.25rem;
`

const HeaderCell = styled.td`
  user-select: none;
  padding: ${PADDING};
`

const SongTableContainer = styled.div`
  margin-bottom: 4rem;
`

const Thumbnail = styled.img`
  width: 2.5rem;
  min-width: 2.5rem;
  margin: 0;
  line-height: 0;
`

const Title = styled.h2`
  margin: 0 0 0.75rem;
`

const AlbumHeader = styled(HeaderCell)`
  width: auto;
`

const ArtistHeader = styled(HeaderCell)`
  width: 15%;
`

const DurationHeader = styled(HeaderCell)`
  width: 2rem;
`

const ThumbnailHeader = styled(HeaderCell)`
  width: 4rem;
`

const TitleHeader = styled(HeaderCell)`
  width: 30%;
`

const ThumbnailCell = styled(BodyCell)`
  padding: 0.2rem 0;
`

const SongTableRow: React.FC<{ track: Track }> = ({ track }) => {
  const [hover, setHover] = React.useState<boolean>(false)

  return (
    <BodyRow
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <ThumbnailCell>
        <Thumbnail src={track.album.images.small.url} />
      </ThumbnailCell>
      <BodyCell hover={hover}>{track.name}</BodyCell>
      <BodyCell hover={hover}>{track.artist.name}</BodyCell>
      <BodyCell hover={hover}>{track.album.name}</BodyCell>
      <BodyCell hover={hover}>3:22</BodyCell>
    </BodyRow>
  )
}

interface SongTableProps {
  title: string
  tracks: Track[]
}

const SongTable: React.FC<SongTableProps> = ({ title, tracks }) => {
  return (
    <SongTableContainer>
      <Title>{title}</Title>
      <table>
        <thead>
          <tr>
            <ThumbnailHeader />
            <TitleHeader>Title</TitleHeader>
            <ArtistHeader>Artist</ArtistHeader>
            <AlbumHeader>Album</AlbumHeader>
            <DurationHeader>Duration</DurationHeader>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <SongTableRow key={index} track={track} />
          ))}
        </tbody>
      </table>
    </SongTableContainer>
  )
}

export default SongTable
