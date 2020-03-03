json.partial! 'api/partials/album', album: @album

json.tracks @album['tracks']['items'], partial: 'api/partials/track', as: :track
