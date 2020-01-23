json.albums @results['albums']['items'], partial: 'partials/album', as: :album
json.artists @results['artists']['items'], partial: 'partials/artist', as: :artist
json.tracks @results['tracks']['items'], partial: 'partials/track', as: :track
