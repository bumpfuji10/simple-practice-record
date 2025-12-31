Rails.application.routes.draw do
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  get "dashboard", to: "dashboards#show", as: :dashboard
  get "mycalendar", to: "calendars#show", as: :mycalendar
  get "mystatistics", to: "statistics#show", as: :mystatistics

  root "practice_records#index"
  resources :practice_records, only: [:index, :create]
  resources :users, only: [:show]
  get "up" => "rails/health#show", as: :rails_health_check
end
