import * as React from 'react'
import { useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import { Container } from '../components/styled'
import { useAlbums } from '../reducers/albums'
import Loader from '../components/Loader'

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { loading, album } = useAlbums(albumId)

  return (
    <Layout
      Header={() => (album ? <h1>{album.name}</h1> : <Loader height={30} />)}>
      {loading ? (
        <Container>
          {albumId} <br />- Loading: {loading.toString()}
          <br />- Album Name: {album && album.name}
        </Container>
      ) : null}
    </Layout>
  )
}

export default Album
