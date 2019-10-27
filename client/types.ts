export interface AuthToken {
  expiry: string
  uid: string
  'access-token': string
  client: string
  'token-type': 'Bearer'
}

export interface ApiUser {
  email: string
  username: string
  name?: string
  nickname?: string
  image?: string
}
