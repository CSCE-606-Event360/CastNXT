class Negotiation
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  belongs_to :client
  field :intermediateSlides, type: Array
  field :finalSlides, type: Array
end
