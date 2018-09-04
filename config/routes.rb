Rails.application.routes.draw do
  devise_for :users

  resources :trips do
    resources :legs, except: [ :edit, :update ]
  end

  resources :legs, only: [ :update ]


  resources :users, only: [:show, :edit, :update]


  resources :pages, only: [:home, :show]
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
