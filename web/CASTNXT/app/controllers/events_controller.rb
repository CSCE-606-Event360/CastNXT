class EventsController < ApplicationController
  # GET /admin/events/:id
  # GET /client/events/:id
  # GET /user/events/:id
  def show
    if "ADMIN".casecmp? session[:userType]
      producer_event
    elsif "CLIENT".casecmp? session[:userType]
      client_event
    else
      user_event
    end
  end

  # GET /admin/events/new
  def new
    unless is_user_logged_in?("ADMIN")
      return redirect_to root_path
    end
    
    formIds = []

    forms = get_producer_forms(session[:userId])
    forms.each do |form|
      # logger.debug form.inspect
      fd = []
      km = get_events(form._id)
      logger.debug km.inspect
      if(km[0]!= nil)
        fd << form._id.to_str
        fd << km[0].title.to_str
        formIds << fd
        logger.debug fd
      else
        form.destroy()
      end

    end

    @properties = {name: session[:userName], formIds: formIds}
  end

  # PATCH /admin/events/:id
  def edit
    begin
      if is_user_logged_in?("ADMIN")
        eventId = params[:id]
        event = get_event(eventId)

        render json: {comment: "Edited Event Successfully!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
      
    # rescue Exception
    #   render json: {comment: "Internal Error!"}, status: 500
    end
  end

  # PUT /admin/events/:id
  def update
    begin
      if is_user_logged_in?("ADMIN")
        eventId = params[:id]
        event = get_event(eventId)
        if params[:status]== "DELETED" || params[:status] == "ACCEPTING" || params[:status] == "REVIEWING" || params[:status] == "FINALIZED"
          update_event_status(event, params[:status])
        else 
          params[:status] = event[:status]
          edit_event(event, params)
          talents = Talent.all
          talents.each do |talent|
            if talent_slide_exists?(eventId, talent.id)
              event = get_event(eventId)
              UserMailer.form_edited(talent.email, event.title).deliver_now
              puts(talent.email)
              puts(event.title)
            end
          end
        end

        puts("step 1")
        if(params[:status] == "DELETED")
          talents = Talent.all
          talents.each do |talent|
            puts("step 2")
            if talent_slide_exists?(eventId, talent.id)
              event = get_event(eventId)
              puts("step 3")
              UserMailer.deleted_event(talent.email, event.title, event.delete_time).deliver_now
              puts(talent.email)
              puts(event.title)
              puts("step 4")
            end
          end
        end
        render json: {comment: "Updated Event Status!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    # rescue Exception
    #   render json: {comment: "Internal Error!"}, status: 500
    end
  end

  # POST /admin/events
  def create
    begin
      if is_user_logged_in?("ADMIN")
        create_event(session[:userId], params)
        render json: {comment: "Successfully created Event!"}, status: 201
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Mongoid::Errors::Validations => e
      render json: {comment: "Event with this title exists"}, status: 500
    rescue
      render json: {comment: "Internal server error!"}, status: 500
    end
  end

  private
  
  def user_event
    unless is_user_logged_in?("USER")
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    form = get_form(event.form_id)
    
    data = JSON.parse(form.data)
    data[:id] = eventId
    data[:title] = event.title
    data[:description] = event.description
    data[:location] = event.location
    data[:statename] = event.statename
    data[:eventdate] = event.eventdate
    data[:category] = event.category
    data[:is_paid_event] = event.is_paid_event

    data['formData'] = {
      name: session[:userName],
      email: session[:userEmail]
    }
    
    if talent_slide_exists?(eventId, session[:userId])
      slide = get_talent_slide(eventId, session[:userId])
      data[:formData] = JSON.parse(slide.data)
    end
    userTalent = Talent.find_by(:_id => session[:userId])
    
    if userTalent[:talentData].nil?
      newTalentData = {}
    else
      newTalentData = JSON.parse(userTalent[:talentData])
    end
   
    
    @properties = {name: session[:userName],email:session[:userEmail], data: data , talentData: newTalentData}
  end
  
  def producer_event
    unless is_user_logged_in?("ADMIN")
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    form = get_form(event.form_id)
    
    data = JSON.parse(form.data)
    data[:id] = eventId
    data[:title] = event.title
    data[:description] = event.description
    data[:status] = event.status
    data[:location] = event.location
    data[:statename] = event.statename
    data[:eventdate] = event.eventdate
    data[:category] = event.category
    data[:is_paid_event] = event.is_paid_event

    data[:clients] = build_producer_event_clients(event)
    data[:slides] = build_producer_event_slides(event)
    formIds = []

    forms = get_producer_forms(session[:userId])
    forms.each do |form|
      # logger.debug form.inspect
      fd = []
      km = get_events(form._id)
      
      if(km[0])
        fd << form._id.to_str
        fd << km[0].title.to_str
        formIds << fd
        logger.debug fd
      else
        form.destroy()
      end

    end

    @properties = {name: session[:userName], data: data,formIds:formIds}
  end
  
  def client_event
    unless is_user_logged_in?("CLIENT")
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    client = get_client(session[:userId])
    form = get_form(event.form_id)
    negotiation = get_negotiation(client._id, event._id)
      
    data = JSON.parse(form.data)
    data[:id] = eventId
    data[:title] = event.title
    data[:description] = event.description
    data[:status] = event.status
    data[:negotiationId] = negotiation._id.to_str
    data[:finalizedIds] = negotiation.finalSlides
    data[:location] = event.location
    data[:statename] = event.statename
    data[:eventdate] = event.eventdate
    data[:category] = event.category
    data[:is_paid_event] = event.is_paid_event

    data[:clientId] = client._id.to_str
    data[:slides] = build_client_event_slides(event, client)
    
    @properties = {name: session[:userName], data: data}
  end
  
  def unknown_event? eventId
    if Event.where(:_id => eventId).blank?
      render :file => "#{Rails.root}/public/404.html",  layout: false, status: :not_found
      return true
    else
      return false
    end
  end
  
  def build_producer_event_clients event
    clientsObject = {}
    
    clients = Client.all
    clients.each do |client|
      clientObject = {}
      clientObject[:name] = client.name
      clientObject[:slideIds] = []
      clientObject[:finalizedIds] = []
      clientObject[:negotiationId] = ""
      clientObject[:preferenceSubmitted] = false
      
      if negotiation_exists?(client._id, event._id)
        negotiation = get_negotiation(client, event)
        
        clientObject[:negotiationId] = negotiation._id.to_str
        clientObject[:finalizedIds] = negotiation.finalSlides
        clientObject[:slideIds] = negotiation.intermediateSlides
        clientObject[:preferenceSubmitted] = true
      end
      
      clientsObject[client._id.to_str] = clientObject
    end
    
    return clientsObject
  end
  
  def build_producer_event_slides event
    slidesObject = {}
    
    event.slide_ids.each do |slideId|
      slide = get_slide(slideId)
      talent = get_talent(slide.talent_id)
      
      slideObject = {}
      slideObject[:talentName] = talent.name
      slideObject[:formData] = JSON.parse(slide.data)
      slideObject[:curated] = slide.curated
      slideObject[:comments] = []

      slide.comment_ids.each do |commentId|
        clientFound=get_comment(commentId)
        slideObject[:comments].push({:commentContent => clientFound.content, :commentOwner => clientFound.owner, :commentClient =>clientFound.client_id.to_str})        
      end
      
      slidesObject[slideId.to_str] = slideObject
    end
    
    return slidesObject
  end
  
  def build_client_event_slides event, client
    slidesObject = {}
    
    (event.slide_ids & client.slide_ids).each do |slideId|
      slide = get_slide(slideId)
      talent = get_talent(slide.talent_id)
      
      slideObject = {}
      slideObject[:talentName] = talent.name
      slideObject[:formData] = JSON.parse(slide.data)
      slideObject[:comments] = []

      (slide.comment_ids & client.comment_ids).each do |commentId|
        slideObject[:comments].push({:commentContent => get_comment(commentId).content, :commentOwner => get_comment(commentId).owner})        
      end
      
      slidesObject[slideId.to_str] = slideObject
    end
    
    negotiation = get_negotiation(client._id, event._id)
    orderedSlidesObject = {}
    
    negotiation.intermediateSlides.each do |slideId|
      orderedSlidesObject[slideId] = slidesObject[slideId]
    end
    
    slidesObject = orderedSlidesObject
    
    return slidesObject
  end
  
  def update_event_status event, status
    event.update(:status => status)
    event.update(:delete_time => Time.now)
  end

  def edit_event event, params
    event.update(:form_id => params[:form_id],:title => params[:title], :description => params[:description], :location => params[:location], :statename => params[:statename], :eventdate => params[:eventdate], :category => params[:category], :is_paid_event => params[:is_paid_event])
  end
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_producer_forms producerId
    return Form.where(:producer_id => producerId)
  end

  def get_events formId
    return Event.where(:form_id => formId)
  end
  
  def get_form formId
    return Form.find_by(:_id => formId)
  end
  
  def get_client clientId
    return Client.find_by(:_id => clientId)
  end
  
  def get_talent talentId
    return Talent.find_by(:_id => talentId)
  end
  
  def get_slide slideId
    return Slide.find_by(:_id => slideId)
  end

  def get_comment commentId
    return Comment.find_by(:_id => commentId)
  end

  # def get_slide_comment slideId
  #   return Comment.find(:slide_id => slideId)
  # end  

  # def get_slide_comments slideId
  #   return Comment.where(:slide_id => slideId)
  # end

  def get_slide_client_comments slideId, clientId
    return Comment.where(:slide_id => slideId, :client_id => clientId)
  end
  
  def negotiation_exists? clientId, eventId
    if Negotiation.where(:event_id => eventId, :client_id => clientId).present?
      return true
    end
    
    return false
  end
  
  def get_negotiation clientId, eventId
    return Negotiation.find_by(:event_id => eventId, :client_id => clientId)
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
  
  def create_event producerId, params
    timeval = Time.now
    #puts("here here yess")
    #puts(timeval)
    Event.create!(:form_id => params[:form_id], :producer_id => producerId, :status => "ACCEPTING", :title => params[:title], :description => params[:description], :location => params[:location], :statename => params[:statename], :eventdate => params[:eventdate], :category => params[:category], :delete_time => "timeval", :is_paid_event => params[:is_paid_event])

  end
end
