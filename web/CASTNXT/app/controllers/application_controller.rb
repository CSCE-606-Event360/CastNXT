class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  
  def is_user_logged_in? userType
    flag = is_session_valid?
    flag = flag && ( userType.casecmp? session[:userType] )
    return flag
  end
  
  def is_session_valid?
    flag = session.key?(:userEmail) && session.key?(:userType) && session.key?(:userName)
    flag = flag && !session[:userEmail].nil? && !session[:userType].nil? && !session[:userName].nil?
    return flag
  end
  
  # GET /logout
  def logout
    reset_session
    render json: {redirect_path: "/"}, status: 200
  end
end
