class Form
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :producer_id, class_name: 'UnifiedUser', foreign_key: 'forms'
  has_many :events
  
  field :data, type: String
end