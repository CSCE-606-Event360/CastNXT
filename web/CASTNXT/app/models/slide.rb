class Slide
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  belongs_to :talent
  has_and_belongs_to_many :clients
  has_many :messages
  has_many :comments
  
  field :curated, type: Boolean
  field :data, type: String
  field :submission_status, type: String
end