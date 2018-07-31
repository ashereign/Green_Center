class Api::PostsController < ApplicationController



  def index
    @posts = Post.all 
    if params[:search]
      @posts = Post.where("title LIKE ?", "%#{params[:search]}%")
    end

    render 'index.json.jbuilder'
  end

  def show
    post_id = params[:id]
    @post = Post.find_by(id: post_id)
    render "show.json.jbuilder"
  end

  def create
    @post = Post.new(
      title: params[:title],
      body: params[:body],
      main_picture: params[:main_picture],
      link: params[:link],
      user_id: current_user.id)


    if @post.save
      params[:topic_ids].each do |topic_id|
      PostTopic.create(
        topic_id: topic_id,
        post_id: @post.id)
    end
      
#create a a new post topic 
      render "show.json.jbuilder"
      # if @post.save
      #   render "show.json.jbuilder"
      # else
      #   render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
      # end
      end
    end 
  def update
    post_id = params[:id]
    @post = Post.find_by(id: post_id)

    @post.title = params[:title] || @post.title
    @post.body = params[:body] || @post.body
    @post.main_picture = params[:main_picture] || @post.main_picture
    @post.link = params[:link] || @post.link
    @post.save
    render "show.json.jbuilder"

  end

  def destroy
   post_id = params[:id]
   @post = Post.find_by(id: post_id)
   @post.destroy
   render json: {message: "Post successfully destroyed"} 
  end
end
