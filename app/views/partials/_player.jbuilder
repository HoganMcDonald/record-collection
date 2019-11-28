json.isPlaying player['is_playing']
json.progress player['progress_ms'] / player['item']['duration_ms']
json.shuffle player['shuffle_state']
json.repeat player['repeat_state']

now_playing = player['item']

json.nowPlaying do
  json.trackName now_playing['name']
  json.trackURI now_playing['uri']
  json.artistName now_playing['artists'].first['name']
  json.artistURI now_playing['artists'].first['uri']
  json.albumName now_playing['album']['name']
  json.albumURI now_playing['album']['uri']

  album_cover = now_playing['album']['images'].third || now_playing['album']['images'].second || now_playing['album']['images'].first
  json.albumCover album_cover['url']
end

device = player['device']

json.device do
  json.name device['name']
  json.volume device['volume_percent']
end
