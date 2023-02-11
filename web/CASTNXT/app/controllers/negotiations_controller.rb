class NegotiationsController < ApplicationController
  # POST /admin/events/:id/negotiations
  # POST /client/events/:id/negotiations
  def create
    if "ADMIN".casecmp? session[:userType]
      create_producer_negotiation
    elsif "CLIENT".casecmp? session[:userType]
      create_client_negotiation
    else
      create_user_negotiation
    end
  end

  private
  
  def create_user_negotiation
    render json: {redirect_path: "/"}, status: 403
  end
  
  def create_producer_negotiation
    begin
      if is_user_logged_in?("ADMIN")
        negotiation = get_negotiation(params[:event_id], params[:client_id])
        update_negotiaton_finals(negotiation, params[:finalSlides])
        
        render json: {comment: "Finalized Talent!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def create_client_negotiation
    begin
      if is_user_logged_in?("CLIENT")
        negotiation = get_negotiation(params[:event_id], session[:userId])
        update_negotiaton_intermediates(negotiation, params[:intermediateSlides])
        
        render json: {comment: "Updated Preferences!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def get_negotiation eventId, clientId
    return Negotiation.find_by(:event_id => eventId, :client_id => clientId)
  end
  
  def update_negotiaton_intermediates negotiation, intermediateSlideIds
    negotiation.update(:intermediateSlides => intermediateSlideIds)
  end
  
  def update_negotiaton_finals negotiation, finalSlides
    negotiation.update(:finalSlides => finalSlides)
  end
end
