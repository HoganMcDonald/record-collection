json.name @collection.name
json.default @collection.default

json.albums @albums, partial: 'api/partials/album', as: :album
