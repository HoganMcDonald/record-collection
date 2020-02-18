Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/me', to: 'users#me'
  get '/search', to: 'search#show'
  resource :player, only: [:show, :update]
  resource :collection, only: [:show, :update]
end
