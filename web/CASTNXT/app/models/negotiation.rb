class Negotiation
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  belongs_to :client, class_name: 'UnifiedUser', foreign_key: 'negotiations'
  field :intermediateSlides, type: Array
  field :finalSlides, type: Array
end