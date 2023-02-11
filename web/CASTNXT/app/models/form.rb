class Form
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :producer
  has_many :events
  
  field :data, type: String
end