import React, {Component} from "react"
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";

import Slide from "../Forms/Slide";
import Header from "../Navbar/Header";

class UserEventRegister extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            eventId: properties.data.id,
            title: properties.data.title,
            description: properties.data.description,
            location: properties.data.location, 
            statename: properties.data.statename,
            eventdate: properties.data.eventdate, 
            category: properties.data.category,
            schema: properties.data.schema !== undefined ? properties.data.schema : {},
            uischema: properties.data.uischema !== undefined ? properties.data.uischema : {},
            formData: properties.data.formData !== undefined ? properties.data.formData : properties.talentData,
            status: "",
            message: "",
            disableSubmit: false
        }
    }
    
    submitForm = () => {
        const baseURL = window.location.href
        
        if (this.state.disableSubmit) {
            return
        } else {
            this.setState({
                disableSubmit: true
            })
        }

        // Add validation
        if (!this.validateFormData(this.state.formData)) {
            this.setState({
                status: false,
                message: "Please fill out Name and Email Address",
                disableSubmit: false
            })
            return
        }
        
        axios.post(baseURL + "/slides", {
            formData: JSON.stringify(this.state.formData)
        })
        .then((res) => {
            this.setState({
                status: true,
                message: res.data.comment
            })
            
            setTimeout(() => {
                window.location.href = "/user"
            }, 2500)
        })
        .catch((err) => {
            this.setState({
                status: false,
                message: err.response.data.comment,
                disableSubmit: false
            })
            
            if(err.response.status === 403) {
                window.location.href = err.response.data.redirect_path
            }
        })
    }
   
     // Validate form data
    validateFormData = (formData) => {
       
        if (!formData.name || !formData.email) {
            return false
        }
        return true
    }

    
    back = () => {
        window.location.href = "/user"
    }

    render() {
        
        return(
            <div>
                <div>
                    <Header />
                </div>
            
                <div className="container user-events">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h2>Event Registration</h2>
                            <hr />
                            <Button variant="outlined" onClick={this.back}>Back to Homepage</Button>
                            <br /><br />
                            
                            <div className="form-preview">
                                <h3>{this.state.title}</h3>
                                <span>{this.state.description}</span>
                                <h6>Location : {this.state.location}, {this.state.statename}</h6>
                                <h6>Date : {new Date(this.state.eventdate).toLocaleString()}</h6>
                                <h6>Category: {this.state.category}</h6>
                                <Slide
                                  schema={this.state.schema}
                                  uiSchema={this.state.uischema}
                                  onFormDataChange={(newFormData) => this.setState((prevState) => {
                                      return {
                                          ...prevState,
                                          formData: newFormData.formData
                                      }
                                  })}
                                  formData={this.state.formData}
                                  onSubmit={this.submitForm}
                                />
                            </div>
                            
                            {(this.state.status !== "" && this.state.status) &&
                                <div>
                                    <br />
                                    <Alert severity="success">{this.state.message}</Alert>
                                    <br />
                                </div>
                            }
                            
                            {(this.state.status !== "" && !this.state.status) &&
                                <div>
                                    <br />
                                    <Alert severity="error">Error: {this.state.message}</Alert>
                                    <br />
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserEventRegister