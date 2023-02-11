class ClientController < ApplicationController
  # GET /client
  def index
    unless is_user_logged_in?("CLIENT")
      return redirect_to root_path
    end
    
    tableData = []
    
    eventIds = get_client_event_ids(session[:userId])
    eventIds.each do |eventId|
      event = get_event(eventId)
        
      object = {
        title: event.title,
        id: event._id.to_str,
        status: event.status
      }
        
      tableData << object
    end
    
    @properties = {name: session[:userName], tableData: tableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_client_event_ids clientId
    return Client.find_by(:_id => clientId).event_ids
  end
end
