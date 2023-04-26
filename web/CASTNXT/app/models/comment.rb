class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :content, type: String
  field :owner, type: String 

  belongs_to :slide
  belongs_to :client

end
