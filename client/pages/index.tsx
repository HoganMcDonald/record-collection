import { NextPage } from 'next'
import React from 'react'

import { useAuth } from '../reducers/auth'
import { useUser } from '../reducers/users'
import Layout from '../components/Layout'
import Browse from '../components/Browse'

const Home: NextPage = () => {
  const { authToken } = useAuth()
  const { getMe } = useUser()

  React.useEffect(() => {
    if (!authToken) {
      getMe()
    }
  }, [authToken])

  return (
    <Layout>
      <Browse />
    </Layout>
  )
}

export default Home
