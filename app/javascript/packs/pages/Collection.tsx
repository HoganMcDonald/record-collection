import * as React from 'react'

import Layout from '../components/Layout'
import { useCollections } from '../reducers/collection'
import { Container } from '../components/styled'
import Grid from '../components/Grid'

const Collection: React.FC = () => {
  const { defaultCollection } = useCollections()

  return (
    <Layout>
      <Container>
        <h1>All Albums</h1>
        <Grid albums={defaultCollection.albums} />
      </Container>
    </Layout>
  )
}

export default Collection
