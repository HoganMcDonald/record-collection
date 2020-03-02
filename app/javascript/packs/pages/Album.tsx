import * as React from 'react'
import { useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import { Container } from '../components/styled'
import { useAlbums } from '../reducers/albums'

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { loading, album } = useAlbums(albumId)

  return (
    <Layout Header={() => <h1>Album</h1>}>
      <Container>
        {albumId} <br />- Loading: {loading.toString()}
        <br />- Album Name: {album && album.name}
      </Container>
    </Layout>
  )
}

export default Album
