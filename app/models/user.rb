class User < ApplicationRecord
  has_secure_password
  has_many :posts

  validates :name, :email, :password, :username, presence: true
  validates :email, uniqueness: true
end
