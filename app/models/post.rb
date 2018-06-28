class Post < ApplicationRecord
  has_many :post_topics
  has_many :topics, through: :post_topics
  belongs_to :user
end
