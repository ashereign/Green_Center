json.partial! @topic, partial: 'topic', as: :topic 

json.posts do
json.array! @topic.posts, partial: 'api/posts/post', as: :post 
end