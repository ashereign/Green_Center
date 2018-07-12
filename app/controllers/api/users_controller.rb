class Api::UsersController < ApplicationController

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
end
