json.name artist['name']
json.uri artist['uri']

if artist['images'].present?
  json.images do
    json.large artist['images'][0]
    json.medium artist['images'][1]
    json.small artist['images'][2]
  end
end
