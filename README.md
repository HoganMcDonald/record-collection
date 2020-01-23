# README

## Set Up

First, obtain credentials in spotify: https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app

Requires rvm, nvm, and yarn for install.

1. `cp .env.sample .env`
1. `vi .env` - fill in values
1. `rvm use`
1. `bundle`
1. `rake db:setup`
1. `cd client`
1. `nvm use`
1. `yarn`

## Development

tab 1
1. `rails s`

tab 2
1. `cd client && yarn dev`

### TODOs

1. handle 403s in spotify client
1. disable functions that are restricted in player
1. apply min width to layout
1. have playhead change callback return a promise so that it doesn't jump around when dragged.
1. investigate why occasionally logged out after non-use
1. animate toasts being added deleted etc.
1. countdown on toasts
1. remove unnecessary code from icons
1. improve focus styles
