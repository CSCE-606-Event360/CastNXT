require 'rails_helper'
RSpec.describe AdminController, type: :controller do
    before do
        Producer.destroy_all
        Client.destroy_all
        Talent.destroy_all
        Auth.destroy_all
        @auth_test = Auth.create!(name:'admintest_admin', email:'admintest_admin@gmail.com',password:'12345678',user_type:'ADMIN')
        @admin=Producer.create!(name:'admintest_admin', email:'admintest_admin@gmail.com')
        @form = Form.create!(producer_id:@admin._id.to_str,)
        @event = Event.create!(title: "test",producer_id:@admin._id.to_str,status:"ACCEPTING",form_id:@form._id.to_str)
    end

    describe "admin#index" do
        it "succeed if session is already" do
            session[:userType]="ADMIN"
            session[:userName]="admintest_admin"
            session[:userEmail]="admintest_admin@gmail.com"
            session[:userId]=@admin._id.to_str
            get :index 
            expect(response).to have_http_status(:success)
        end
        it "failed if not logged in as admin" do
            session[:userType]="CLIENT"
            session[:userName]="admintest_admin"
            session[:userEmail]="admintest_admin@gmail.com"
            session[:userId]=@admin._id.to_str
            get :index 
            expect(response).to have_http_status(:redirect)
        end

    end
end
