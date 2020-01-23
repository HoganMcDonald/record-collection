json.name track['name']
json.uri track['uri']

json.artist do
  json.partial! 'partials/artist', artist: track['artists'].first
end

json.album do
  json.partial! 'partials/album', album: track['album']
end
