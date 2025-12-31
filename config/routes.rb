Rails.application.routes.draw do
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  root "practice_records#index"
  resources :practice_records, only: [:index, :create]
  get "up" => "rails/health#show", as: :rails_health_check
end
