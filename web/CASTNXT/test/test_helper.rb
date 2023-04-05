ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'

# https://stackoverflow.com/questions/52959888/activerecordconnectionnotestablished-no-connection-pool-for-activerecordbas
# ActiveRecord::ConnectionNotEstablished: No connection pool with 'primary' found.
Object.send(:remove_const, :ActiveRecord)

require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.

  # fixtures :all
  # Add more helper methods to be used by all tests here...
end
