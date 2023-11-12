require 'rails_helper'
RSpec.describe HomeController, type: :controller do
    describe 'home#landing_page' do
        it "should return the landing page" do
            get :landing_page
            expect(response).to have_http_status(:success)
        end
    end
end