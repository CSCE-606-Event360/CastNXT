require 'rails_helper'


RSpec.describe EventsController, type: :controller do
    before do
        Event.create(status:'ACCEPTING',title:'test1',description:'test',location:"Houston",statename:'Texas',is_paid_event:'no')
    end
    describe 'GET' do
        let (:test1) do 
            Event.create(status:'ACCEPTING',title:'test1',description:'test',location:"Houston",statename:'Texas',is_paid_event:'no')
        end
        it 'get /user/events/:id(.:format)' do
            get "/user/events/#{test1.id}"
            expect(response).to be_successful 
        end
    end
end
