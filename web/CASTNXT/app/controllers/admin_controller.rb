class AdminController < ApplicationController
  # GET /admin
  def index
    unless is_user_logged_in?("ADMIN")
      return redirect_to root_path
    end
    
    tableData = []
    
    eventIds = get_producer_event_ids(session[:userId])
    eventIds.each do |eventId|
      event = get_event(eventId)
      
      object = {
        id: event._id.to_str,
        title: event.title,
        status: event.status,
        delete_time: event.delete_time
      }
      
      tableData << object
    end
    @properties = {name: session[:userName], tableData: tableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_producer_event_ids producerId
    return Producer.find_by(:_id => producerId).event_ids
  end
end
