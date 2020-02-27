json.name track['name']
json.uri track['uri']

json.artist do
  json.partial! 'api/partials/artist', artist: track['artists'].first
end

json.album do
  json.partial! 'api/partials/album', album: track['album']
end
