Rails.application.routes.draw do
  devise_for :users

  resources :trips do
    resources :legs, except: [ :edit, :update, :destroy ]
    resources :point_of_interests do
      resources :legs, only: :destroy
    end
  end

  resources :legs, only: :update

  resources :users, only: [:show, :edit, :update]


  resources :pages, only: [:home]
  get '/dashboard', to: 'pages#dashboard'
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
