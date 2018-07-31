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
    # user_id = current_user.id
    @user = User.find_by(id: params[:id])
    render "show.json.jbuilder"
  end

  def update
    user_id = params[:id]
    @user = User.find_by(id: user_id)

    @user.name = params[:name] || @user.name
    @user.email = params[:email] || @user.email
    @user.avatar = params[:avatar] || @user.avatar
    @user.username = params[:username] || @user.username
    @user.password = params[:password] || @user.password
    @user.password_confirmation = params[:password_confirmation] || @user.password_confirmation
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
