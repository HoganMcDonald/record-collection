json.albums @results['albums']['items'], partial: 'api/partials/album', as: :album
json.artists @results['artists']['items'], partial: 'api/partials/artist', as: :artist
json.tracks @results['tracks']['items'], partial: 'api/partials/track', as: :track
