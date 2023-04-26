class Client
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  field :is_valid, type: Boolean
  field :is_active, type: Boolean, default: true
  
  has_and_belongs_to_many :events
  has_and_belongs_to_many :slides
  has_many :negotiations
  has_many :comments
end