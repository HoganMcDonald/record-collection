import { NextPage } from 'next'
import React from 'react'

import { useAuth } from '../reducers/auth'
import { useUser } from '../reducers/users'
import Layout from '../components/Layout'

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
      <h1>Logged in!</h1>
    </Layout>
  )
}

export default Home
