import { NextPage } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import Browse from '../components/Browse'
import Authenticator from '../components/Authenticator'

const Home: NextPage = () => {
  return (
    <Authenticator>
      <Layout>
        <Browse />
      </Layout>
    </Authenticator>
  )
}

export default Home
