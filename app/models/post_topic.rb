class PostTopic < ApplicationRecord
  belongs_to :post 
  belongs_to :topic
end
