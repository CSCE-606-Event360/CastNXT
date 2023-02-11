class UserController < ApplicationController
  # GET /user
  def index
    unless is_user_logged_in?("USER")
      return redirect_to root_path
    end
    
    acceptingTableData = []
    submittedTableData = []
    
    talent = get_talent(session[:userId])
    events = Event.all

    events.each do |event|
      object = {
        title: event.title,
        id: event._id.to_str, 
        delete_time: event.delete_time,
        category: event.category,
        date: event.eventdate,
        statename: event.statename,
        location: event.location,
        ispaid: event.is_paid_event
      }
      
      if talent_slide_exists?(event._id, talent._id)
        if "ACCEPTING".casecmp? event.status
          object["accepting"] = true
          object["status"] = "SUBMITTED"
        elsif "FINALIZED".casecmp? event.status
          object["accepting"] = false
          if talent_accepted?(event._id, talent._id)
            object["status"] = "ACCEPTED"
          else
            object["status"] = "REJECTED"
          end
        else
          object["accepting"] = false
          object["status"] = event.status
        end
        
        submittedTableData << object
      else
        if "ACCEPTING".casecmp? event.status
          acceptingTableData << object
        end
      end
    end
    @properties = {name: session[:userName], acceptingTableData: acceptingTableData, submittedTableData: submittedTableData}
  end
  
  private
  
  def get_talent talentId
    return Talent.find_by(:_id => talentId)
  end
  
  def get_event_negotiations eventId
    return Negotiation.where(:event_id => eventId)
  end
  
  def get_talent_slide eventId, talentId
    return Slide.find_by(:event_id => eventId, :talent_id => talentId)
  end
  
  def talent_slide_exists? eventId, talentId
    if Slide.where(:event_id => eventId, :talent_id => talentId).present?
      return true
    end
    
    return false
  end
  
  def talent_accepted? eventId, talentId
    slide = get_talent_slide(eventId, talentId)
    negotiations = get_event_negotiations(eventId)
    
    negotiations.each do |negotiation|
      if negotiation.finalSlides.include? slide._id.to_str
        return true
      end
    end
    
    return false
  end
end
