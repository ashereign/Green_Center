Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"
namespace :api do

  get "/posts" => "posts#index"
  get "/posts/:id" => "posts#show"
  post "/posts" => "posts#create"
  patch "/posts/:id" => "posts#update"
  delete "/posts/:id" => "posts#destroy"

  get "/topics" => "topics#index"
  get "topics/:id" => "topics#show"

  post "/post_topics" => "post_topics#create"
  get "/post_topics" => "post_topics#index"
  delete '/post_topics/:id' => 'post_topics#destroy'

  
end  

get "/users/:id" => "users#show"
post "/users" => "users#create"
patch "/users/:id" => "users#update"
delete "/users/:id" => "users#destroy"

end
