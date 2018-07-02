class Api::TopicsController < ApplicationController

  def index
    @topics = Topic.all 
    render 'index.json.jbuilder'
  end

  def show
    topic_id = params[:id]
    @topic = Topic.find_by(id: topic_id)
    render "show.json.jbuilder"
  end
end
