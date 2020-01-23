import { SpotifyUri } from '../types'

const parseUri = (uri: SpotifyUri) => {
  const uriComponents = uri.split(':')
  return {
    type: uriComponents[1],
    id: uriComponents[2],
  }
}

export const resourceLocation = (uri: SpotifyUri) => {
  const uriHash = parseUri(uri)
  return `${uriHash.type}/${uriHash.id}`
}
