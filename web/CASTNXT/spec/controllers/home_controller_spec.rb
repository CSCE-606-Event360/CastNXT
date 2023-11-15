require 'rails_helper'
RSpec.describe HomeController, type: :controller do
    before do
        Producer.destroy_all
        Client.destroy_all
        Talent.destroy_all
        Auth.destroy_all
    end
    describe 'home#landing_page' do
        it "should return the landing page" do
            get :landing_page
            expect(response).to have_http_status(:success)
        end
    end
    describe 'home#index' do
        it "should return the index" do
            get :index
            expect(response).to have_http_status(:success)
        end
        it "should automatically login if session is not set" do
            post :signup,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            get :index
            expect(response).to have_http_status(:redirect)
        end
    end
    describe 'home@signup' do
        it 'should change count if no existing producer' do
            expect{
                post :signup,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            }.to change(Producer, :count).by(1)
        end
        it 'should change count if no existing client' do
            expect{
                post :signup,params:{name:'hometest_client', email:'hometest_client@gmail.com',password:'12345678',type:'CLIENT'}
            }.to change(Client, :count).by(1)
        end
        it 'should change count if no existing talent' do
            expect{
                post :signup,params:{name:'hometest_talent', email:'hometest_talent@gmail.com',password:'12345678',type:'USER'}
            }.to change(Talent, :count).by(1)
        end
        it "should not change count if email existing" do
            post :signup,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect{
                post :signup,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            }.to_not change(Producer, :count)
        end
    end
    describe 'home@login' do
        it "should failed if no matches" do
            post :login,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect(response).to have_http_status(400)
        end
        it "should succeed if matches" do
            post :signup,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            post :login,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect(response).to have_http_status(200)
        end
        it 'failed when not active' do
            Auth.create!(name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',user_type:'ADMIN',is_active:false)
            Producer.create!(name:'hometest_admin', email:'hometest_admin@gmail.com',is_active:false)
            post :login,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect(response).to have_http_status(400)
        end
        it 'failed when not valid' do
            Auth.create!(name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',user_type:'ADMIN',is_valid:false)
            Producer.create!(name:'hometest_admin', email:'hometest_admin@gmail.com',is_active:false)
            post :login,params:{name:'hometest_admin', email:'hometest_admin@gmail.com',password:'12345678',type:'ADMIN'}
            expect(response).to have_http_status(400)
        end
    end

end