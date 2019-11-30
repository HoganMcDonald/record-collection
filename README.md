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
