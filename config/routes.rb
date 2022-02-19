Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  resource :games do
    get :single
    get :cross
    get :full
    get :verify
    get :react
  end
  root "games#react"
end
