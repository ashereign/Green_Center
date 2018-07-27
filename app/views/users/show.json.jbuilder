json.id @user.id
json.username @user.username
json.email @user.email
json.name @user.name
json.avatar @user.avatar




  # # orif current_user.id == post.user_id
  # json.posts do
  #   json.title post.title 
  #   #maybe add link to post show page in the title
  #   json.main_picture post.main_picture
  # end

  json.posts do
    json.array! @user.posts, partial: 'api/posts/post', as: :post
  end 

