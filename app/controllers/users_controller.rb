class UsersController < ApplicationController

  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      username: params[:username],
      avatar: params[:avatar],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if @user.save
      render "show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    user_id = current_user[:id]
    @user = User.find_by(id: user_id)
    render "show.json.jbuilder"
  end

  def update
    user_id = params[:id]
    @user = User.find_by(id: user_id)

    @user.name = params[:name] || @post.name
    @post.email = params[:email] || @post.email
    @post.avatar = params[:avatar] || @post.avatar
    @post.username = params[:username] || @post.username
    @post.password = params[:password] || @post.password
    @post.password_confirmation = params[:password_confirmation] || @post.password_confirmation
    @user.save
    render "show.json.jbuilder"
  end

  def destroy
   user_id = current_user[:id]
   @user = User.find_by(id: user_id)
   @user.destroy
   render json: {message: "Account successfully destroyed"} 
  end
end
