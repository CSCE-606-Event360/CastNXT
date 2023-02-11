class FormsController < ApplicationController
  # GET /admin/forms/:id
  def show
    begin
      if is_user_logged_in?("ADMIN")
        form =  get_form(params[:id])
        formData = {
          id: form._id.to_str,
          data: form.data
        }
        render json: {formData:  formData}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end

  # POST /admin/forms
  def create
    begin
      if is_user_logged_in?("ADMIN")
        form = create_form(session[:userId], params)
        render json: {comment: "Form was successfully created!", formId:  form._id.to_str}, status: 201
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end

  private
  
  def get_form formId
    return Form.find_by(:_id => formId)
  end
  
  def create_form producerId, params
    Form.create(:producer_id => producerId, :data => params[:data])
  end
end
