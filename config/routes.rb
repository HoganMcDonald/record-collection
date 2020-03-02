Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/login', to: 'home#index'

  authenticated :user do
    root to: 'home#index', as: :authenticated_root
    get '/collection', to: 'home#index'
    get '/album/:album_id', to: 'home#index'
  end

  root to: redirect('/login')

  namespace :api do
    get '/me', to: 'users#me'
    get '/search', to: 'search#show'
    resource :player, only: [:show, :update]
    resource :collection, only: [:show, :update]
  end
end
