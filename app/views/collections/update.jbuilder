json.name @collection.name
json.default @collection.default

json.albums @albums, partial: 'partials/album', as: :album
