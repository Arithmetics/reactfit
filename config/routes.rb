Rails.application.routes.draw do
  get 'content/home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'content#home'
end
