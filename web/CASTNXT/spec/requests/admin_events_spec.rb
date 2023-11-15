require 'rails_helper'
RSpec.describe 'admin events interactions', type: :request do
    before(:context) do
        Producer.destroy_all
        Client.destroy_all
        Talent.destroy_all
        Auth.destroy_all
    end
    describe "login as admin" do
        it "should register as admin" do
            expect{
                post signup_home_index_path,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            }.to change(Producer, :count).by(1)
        end

        it "should login as admin" do
            post login_home_index_path,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect(response).to have_http_status(200)
        end
    end
end
