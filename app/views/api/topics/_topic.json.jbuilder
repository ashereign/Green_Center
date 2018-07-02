json.name topic.name
json.theme_picture topic.theme_picture

json.posts do
json.array! topic.posts, partial: 'api/posts/post', as: :post 
end


