import React, {Component} from "react"
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ClientEventFeedback from "./ClientEventFeedback";
import ClientEventSummary from "./ClientEventSummary";
import Header from "../Navbar/Header";

class ClientEventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: properties.data.title,
            description: properties.data.description,
            location: properties.data.location,
            statename: properties.data.statename, 
            eventdate: properties.data.eventdate, 
            category: properties.data.category,
            tabValue: 0
        }
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    back = () => {
        window.location.href = "/client"
    }
    
    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="container">
                    <div className="user-events">
                        <h2> {this.state.title} </h2>
                        <h6> {this.state.description} </h6>
                        <h6>Location : {this.state.location}, {this.state.statename}</h6>
                        <h6>Date : {this.state.eventdate}</h6>
                        <h6>Category : {this.state.category}</h6>
                        
                        <Button size="small" variant="outlined" style={{float: "right", marginRight: "1%"}} onClick={this.back}>Back to Homepage</Button>
                        
                        <div>
                            <Box sx={{ width: '100%', marginRight: '-2%' }}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                  <Tab label="Event Preferences" />
                                  <Tab label="Event Feedback" />
                                </Tabs>
                              </Box>
                              
                              {this.state.tabValue === 0 &&
                                  <div>
                                    <ClientEventSummary properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 1 &&
                                  <div>
                                    <ClientEventFeedback properties={properties} />
                                  </div>
                              }
                             
                            </Box>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientEventPage