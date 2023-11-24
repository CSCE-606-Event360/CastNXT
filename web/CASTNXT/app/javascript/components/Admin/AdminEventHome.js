import React, {Component} from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Alert from "@mui/material/Alert";
import axios from "axios";

class AdminEventHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventStatus: props.properties.data.status,
            message: "",
            status: ""
        }
    }
    
    back = () => {
        window.location.href = "/admin"
    }
    
    handleChange = (e) => {
      const baseURL = window.location.href.split("#")[0]
      
      axios.put(baseURL, {
        status: e.target.value
      })
      .then((res) => {
        if (confirm("Are you sure you want to change the event status?")==true){
          this.props.properties.data.status = e.target.value
          
          this.setState({
            status: true,
            eventStatus: e.target.value,
            message: res.data.comment
          })
          this.back()
        }
      })
      .catch((err) => {
        this.setState({
          status: false,
          message: "Failed to update Event Status!"
        })
        
        if(err.response.status === 403) {
          window.location.href = err.response.data.redirect_path
        }
      })
    }

    render() { 
        return(
            <div>
                <div style={{marginTop: "1%"}}>
                    <p>Use this page to update an event status - click on any status below.</p>
                    
                    <div>
                      <div className="col-md-8 offset-md-2">
                        <ToggleButtonGroup
                          id='ToggleButtonGroup'
                          color="success"
                          value={this.state.eventStatus}
                          exclusive
                          onChange={this.handleChange}
                        >
                          <ToggleButton value="ACCEPTING">ACCEPTING</ToggleButton>
                          <ToggleButton value="REVIEWING">REVIEWING</ToggleButton>
                          <ToggleButton value="FINALIZED">FINALIZED</ToggleButton>
                          <ToggleButton value="DELETED">DELETED</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                        
                      {(this.state.status !== "" && this.state.status) && 
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="success">{this.state.message}</Alert>
                            <br />
                          </div>
                      }
                      
                      {(this.state.status !== "" && !this.state.status) &&
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="error">Error: {this.state.message}</Alert>
                            <br />
                          </div>
                      }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEventHome