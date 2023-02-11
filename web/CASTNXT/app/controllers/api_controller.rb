class ApiController < ApplicationController
  # GET /user
    def index
        talents = Talent.all
        render json:talents
    end
    
    def change_status
        user = Talent.find_by(:_id => params[:id] )
        user.is_active = !user.is_active
        user.save
        
        auth_user = Auth.find_by(:email => user.email)
        auth_user.is_active = user.is_active
        auth_user.save
        render json:user
    end
end