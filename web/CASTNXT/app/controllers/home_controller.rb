class HomeController < ApplicationController
  # GET /
  def index
    if is_session_valid?
      redirect_to get_redirect_path
    end
  end
  
  # GET /validation/:id
  def validation
    u1 = Auth.find_by(:_id => params[:id])
    typeuser = u1.user_type
    begin
      if "ADMIN".casecmp? typeuser
        user = Producer.find_by(:_id => params[:id])
        user.is_valid = true
        user.save
        auth = Auth.find_by(:_id => params[:id])
        puts auth.email
        auth.is_valid = true
        auth.save
      elsif "CLIENT".casecmp? typeuser
        user = Client.find_by(:_id => params[:id])
        user.is_valid = true
        user.save
        auth = Auth.find_by(:_id => params[:id])
        puts auth.email
        auth.is_valid = true
        auth.save
      else
        user = Talent.find_by(:_id => params[:id])
        user.is_valid = true
        user.save
        auth = Auth.find_by(:_id => params[:id])
        puts "talent"
        puts auth.email
        auth.is_valid = true
        auth.save
      end
      return redirect_to root_path
      #render json: {redirect_path: "User validated!"}, status: 201
    end
  end

  # POST /home/signup
  # POST /admin/signup
  def signup
    begin
      if new_user?(params[:email])
        create_user(params)
        currentUser = get_user(params[:email], params[:password])
        UserMailer.send_welcome(params[:email], currentUser._id.to_str).deliver_now
        session[:userEmail] = currentUser.email
        session[:userType] = currentUser.user_type
        session[:userName] = currentUser.name
        session[:userId] = currentUser._id.to_str
        render json: {comment: "Please check your mailbox for validation email. Validate and login back!"}, status: 400
      else
        render json: {comment: "An account with the given Email already exists!"}, status: 400
      end
    rescue => exception
      puts exception.message
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  # POST /home/login
  def login
    begin
      if correct_user?(params[:email], params[:password])
        currentUser = get_user(params[:email], params[:password])
        if currentUser.is_valid == false
          render json: {comment: "User not validated! Please check your mailbox for validation email."}, status: 400
          return
        elsif currentUser.is_active == false
          render json: {comment: "User is inactive. Contact the admin of the event."}, status: 400
          return
        end
        session[:userEmail] = currentUser.email
        session[:userType] = currentUser.user_type
        session[:userName] = currentUser.name
        session[:userId] = currentUser._id.to_str
        render json: {redirect_path: get_redirect_path}, status: 200
      else
        render json: {comment: "The entered Username or Password is incorrect!"}, status: 400
      end
    rescue Exception => e
      render json: {comment: e.message}, status: 500
    end
  end

  # POST /home/forgotPassword
  def forgotPassword
    begin
      if user_exists?(params[:email])
        resetLink = generate_resetlink(params[:email])
        UserMailer.password_reset(params[:email], resetLink)
        render json: {comment: "A password reset email has been sent to your mailbox!"}, status: 400
        return
      else
        render json: {comment: "No such email exists."}, status: 400
      end
    rescue Exception => e
      render json: {comment: e.message}, status: 500
    end
  end

  def landing_page
    puts "tests"
    respond_to do |format|
      format.html { render :layout => false }
    end
  end
  
  private
  
  def get_user email, password
    return Auth.find_by(:email => email, :password => password)
  end
  
  def new_user? email
    if Auth.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? email, password
    if Auth.where(:email => email, :password => password).present?
      return true
    end
    
    return false
  end

  def user_exists? email
    if Auth.where(:email => email).present?
      return true
    end

    return false
  end

  def generate_resetlink email
    require 'securerandom'
    rCode = SecureRandom.hex(32)
    rsetCode = AuthReset.create(:resetuuid => rCode)
    return rCode
  end
  
  def create_user params
    puts (params)
    user = Auth.create(:name => params[:name], :email => params[:email], :password => params[:password], :user_type => params[:type], :is_valid => true)
    if "ADMIN".casecmp? params[:type]
      Producer.create(:_id => user._id.to_str, :name => user.name, :email => user.email, :is_valid => true)
    elsif "CLIENT".casecmp? params[:type]
      Client.create(:_id => user._id.to_str, :name => user.name, :email => user.email, :is_valid => true)
    else
      Talent.create(:_id => user._id.to_str, :name => user.name, :email => user.email, :is_valid => true)
    end
  end

  def get_redirect_path
    if "ADMIN".casecmp? session[:userType]
      return "/admin"
    elsif "CLIENT".casecmp? session[:userType]
      return "/client"
    else
      return "/user"
    end
  end
end