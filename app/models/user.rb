class User < ApplicationRecord
  has_secure_password


  validates :name, :email, :password, :username, presence: true
  validates :email, uniqueness: true

  has_many :posts
end
