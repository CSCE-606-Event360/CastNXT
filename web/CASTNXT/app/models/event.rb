class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :form
  belongs_to :producer
  has_and_belongs_to_many :clients
  has_many :slides
  has_many :negotiations
  # Add more fields here. To set-up the meta-data.
  field :status, type: String
  field :title, type: String
  field :description, type: String
  field :location, type: String
  field :statename, type: String
  field :eventdate, type: String
  field :category, type: String
  field :delete_time, type: String
  field :is_paid_event, type: String
end