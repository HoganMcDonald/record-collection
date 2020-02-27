import { NextPage } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import { useCollections } from '../reducers/collection'
import { Container } from '../components/styled'
import Grid from '../components/Grid'
import Authenticator from '../components/Authenticator'

const Collection: NextPage = () => {
  const { defaultCollection } = useCollections()

  return (
    <Authenticator>
      <Layout>
        <Container>
          <h1>All Albums</h1>
          <Grid albums={defaultCollection.albums} />
        </Container>
      </Layout>
    </Authenticator>
  )
}

// not sure why this function definition is required, but won't compile without it.
Collection.getInitialProps = async () => ({})

export default Collection
