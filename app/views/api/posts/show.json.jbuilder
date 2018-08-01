json.partial! @post, partial: 'post', as: :post 

json.topics do
  json.array! @post.topics, partial: 'api/topics/topic', as: :topic
end 