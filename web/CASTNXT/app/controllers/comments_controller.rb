class CommentsController < ApplicationController

  # GET /admin/events/:id/comments/:id
  # GET /client/events/:id/comments/:id
  # GET /user/events/:id/comments/:id
  def show
    if "ADMIN".casecmp? session[:userType]
      show_comment
    elsif "CLIENT".casecmp? session[:userType]
      show_comment
    else
      render json: {redirect_path: "/"}, status: 403
    end
  end

# POST /admin/events/:id/comments/:id
  def create
  	
    begin
      if is_user_logged_in?("ADMIN")

        create_comment_producer(params[:slide_id], params[:client_id],  params[:content], params[:owner])
        render json: {comment: "Successfully created Comment as Admin!"}, status: 200
        
      elsif is_user_logged_in?("CLIENT")
      	create_comment_client(params[:slide_id], params[:client_id], params[:content], params[:owner])
        render json: {comment: "Successfully created Comment as Client!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: Exception}, status: 500
    end
  end


  private

  
  def show_comment
    begin
      if is_user_logged_in?("ADMIN")
        comment = get_comments(params[:slide_id], params[:client_id])
      elsif is_user_logged_in?("CLIENT")
      	comment = get_comments(params[:slide_id], params[:client_id])
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: Exception}, status: 500
    end
  end

  
  def get_comment slideId, clientId
    return Comment.find_by(:slide_id => slideId, :client_id => clientId)
  end

  def get_comments slideId, clientId
    return Comment.where(:slide_id => slideId, :client_id => clientId)
  end

  def create_comment_producer slideId, clientId, commentContent, commentOwner
    Comment.create(:slide_id => slideId, :client_id => clientId, :content => commentContent, :owner => commentOwner)
  end

  def create_comment_client slideId, clientId, commentContent, commentOwner
    Comment.create(:slide_id => slideId, :client_id => clientId,  :content => commentContent, :owner => commentOwner)
  end


end
