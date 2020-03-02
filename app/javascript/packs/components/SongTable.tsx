import * as React from 'react'
import styled, { css } from 'styled-components'

import { Track } from '../types'
import { msToTime } from '../lib/helpers'
import LazyImage from './LazyImage'

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
  height: 2.5rem;
  cursor: pointer;
  padding-bottom: 0.25rem;
  box-sizing: border-box;
`

const HeaderCell = styled.td<{ sorted?: boolean }>`
  user-select: none;
  padding: ${PADDING};

  ${({ sorted, theme }) =>
    sorted === true || sorted === false
      ? css`
          cursor: pointer;
          color: ${sorted ? theme.colors.accent : theme.colors.white};
        `
      : null};
`

const SongTableContainer = styled.div`
  margin-bottom: 4rem;
`

const Thumbnail = styled(LazyImage)`
  width: 2.5rem;
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
  padding: 0.2rem 2rem 0;
`

const SongTableRow: React.FC<{ track: Track }> = ({ track }) => {
  const [hover, setHover] = React.useState<boolean>(false)

  return (
    <BodyRow
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <ThumbnailCell>
        <Thumbnail src={track.album.images.small.url} alt="" />
      </ThumbnailCell>
      <BodyCell hover={hover}>{track.name}</BodyCell>
      <BodyCell hover={hover}>{track.artist.name}</BodyCell>
      <BodyCell hover={hover}>{track.album.name}</BodyCell>
      <BodyCell hover={hover}>{msToTime(track.duration)}</BodyCell>
    </BodyRow>
  )
}

type SortKeys = 'artist' | 'title' | 'album' | null

interface SongTableProps {
  title: string
  tracks: Track[]
}

const SongTable: React.FC<SongTableProps> = ({ title, tracks }) => {
  const [sortKey, setSortKey] = React.useState<SortKeys>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    'asc'
  )

  React.useEffect(() => {
    setSortKey(null)
  }, [tracks])

  const handleSetSort = (key: SortKeys) => {
    if (sortKey === key) {
      sortDirection === 'asc' ? setSortDirection('desc') : setSortKey(null)
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const songs = [...tracks].sort((a, b) => {
    const locale = 'en'
    const options: Intl.CollatorOptions = { ignorePunctuation: true }

    const first = sortDirection === 'asc' ? a : b
    const second = sortDirection === 'desc' ? a : b

    switch (sortKey) {
      case 'artist':
        return first.artist.name.localeCompare(
          second.artist.name,
          locale,
          options
        )
      case 'title':
        return first.name.localeCompare(second.name, locale, options)
      case 'album':
        return first.album.name.localeCompare(
          second.album.name,
          locale,
          options
        )
      default:
        return 0
    }
  })

  return (
    <SongTableContainer>
      <Title>{title}</Title>
      <table>
        <thead>
          <tr>
            <ThumbnailHeader />
            <TitleHeader
              sorted={sortKey === 'title'}
              onClick={() => handleSetSort('title')}>
              Title
            </TitleHeader>
            <ArtistHeader
              sorted={sortKey === 'artist'}
              onClick={() => handleSetSort('artist')}>
              Artist
            </ArtistHeader>
            <AlbumHeader
              sorted={sortKey === 'album'}
              onClick={() => handleSetSort('album')}>
              Album
            </AlbumHeader>
            <DurationHeader>Duration</DurationHeader>
          </tr>
        </thead>
        <tbody>
          {songs.map((track, index) => (
            <SongTableRow key={index} track={track} />
          ))}
        </tbody>
      </table>
    </SongTableContainer>
  )
}

export default SongTable
