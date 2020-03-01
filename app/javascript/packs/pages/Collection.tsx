import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { useCollections } from '../reducers/collection'
import { Container } from '../components/styled'
import Grid from '../components/Grid'

const CollectionContainer = styled(Container)`
  padding-top: 0;
`

const Collection: React.FC = () => {
  const { defaultCollection } = useCollections()

  return (
    <Layout Header={() => <h1>All Albums</h1>}>
      <CollectionContainer>
        <Grid albums={defaultCollection.albums} disableAddToCollection={true} />
      </CollectionContainer>
    </Layout>
  )
}

export default Collection
