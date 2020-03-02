import * as React from 'react'
import { useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import { Container } from '../components/styled'

const Album: React.FC = () => {
  const params = useParams<{ album_id: string }>()
  return (
    <Layout Header={() => <h1>Album</h1>}>
      <Container>{params.album_id}</Container>
    </Layout>
  )
}

export default Album
