class Slide
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  # belongs_to :talent
  # has_and_belongs_to_many :clients
  belongs_to :talent, class_name: 'UnifiedUser', foreign_key: 'talent_slides'
  has_and_belongs_to_many :clients, class_name: 'UnifiedUser', foreign_key: 'client_slides'
  has_many :messages
  has_many :comments

  field :curated, type: Boolean
  field :data, type: String
  field :submission_status, type: String
end