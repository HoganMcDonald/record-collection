import * as React from 'react'

import Layout from '../components/Layout'
import Browse from '../components/Browse'
import SearchBar from '../components/SearchBar'

const Home: React.FC = () => {
  return (
    <Layout Header={() => <SearchBar />}>
      <Browse />
    </Layout>
  )
}

export default Home
