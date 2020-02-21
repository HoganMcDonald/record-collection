import { NextPage } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import Browse from '../components/Browse'

const Home: NextPage = () => {
  return (
    <Layout>
      <Browse />
    </Layout>
  )
}

export default Home
