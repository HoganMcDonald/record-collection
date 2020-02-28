Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  root to: 'home#index'
  get '/collection', to: 'home#index'

  namespace :api do
    get '/me', to: 'users#me'
    get '/search', to: 'search#show'
    resource :player, only: [:show, :update]
    resource :collection, only: [:show, :update]
  end
end
