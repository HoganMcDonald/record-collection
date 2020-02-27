json.name album['name']
json.uri album['uri']

json.artist do
  json.partial! 'api/partials/artist', artist: album['artists'].first
end

json.images do
  json.large album['images'][0]
  json.medium album['images'][1]
  json.small album['images'][2]
end
