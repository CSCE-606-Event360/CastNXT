require 'rails_helper'
# require_relative '../../
RSpec.describe UserController, type: :controller do
  # let(:user) { Talent.create!(name:"test0",email:"test0",is_valid:true,) }
  describe 'GET /user/:id' do
    it 'responds successfully' do
      pending
      session[:userId] = user.id
      get :index
      expect(response).to have_http_status(:not_found)
    end
  end
end