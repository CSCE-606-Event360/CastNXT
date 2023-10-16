class UnifiedUser
    include Mongoid::Document
    include Mongoid::Timestamps
    
    # basic
    field :name, type: String
    field :email, type: String
    field :is_valid, type: Boolean
    field :is_active, type: Boolean # , default: true <- default means it is set to true every time an update to UnifiedUser occurs if is_active is not explicitly stated.
    field :password, type: String
    field :user_type, type: String
    field :talentData, type: String

  
    # client
    has_and_belongs_to_many :event_ids, class_name: 'Event', foreign_key: 'clients'
    has_and_belongs_to_many :client_slides, class_name: 'Slide', foreign_key: 'clients'
    has_many :negotiations, class_name: 'Negotiation', foreign_key: 'client_id'
    # producer
    has_many :producer_events, class_name: 'Event', foreign_key: 'producer_id'
    has_many :forms, class_name: 'Form', foreign_key: 'producer_id'
    # talent
    has_many :talent_slides, class_name: 'Slide', foreign_key: 'talent'
  end