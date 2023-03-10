import React, {Component} from "react"
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Header from "../Navbar/Header";
import AdminEventHome from "./AdminEventHome";
import AdminCreateClientStack from "./AdminCreateClientStack";
import AdminClientDecks from "./AdminClientDecks";
import AdminEventSummary from "./AdminEventSummary";
import AdminFinalizedCandidates from "./AdminFinalizedCandidates";
import AdminSubmittedDocs from "./AdminSubmittedDocs";
import AdminEditEvent from "./AdminEditEvent";


const tabToComponent = {
    0: AdminEventHome,
    1: AdminSubmittedDocs,
    2: AdminCreateClientStack,
    3: AdminClientDecks,
    4: AdminFinalizedCandidates,
    5: AdminEventSummary,
    6: AdminEditEvent
}

class AdminEventPage extends Component {
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

    renderTab = () => {
        let Component = tabToComponent[this.state.tabValue];
        return <Component key={`tab_${this.state.tabValue}`} properties={properties} />
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    back = () => {
        window.location.href = "/admin"
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
                        
                        <Button size="small" variant="outlined" style={{float: "right", marginRight: "1%"}} onClick={this.back}>Back to Forms</Button>

                        <div>
                            <Box sx={{ width: "100%", marginRight: "-2%" }}>
                              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                    {["Home","Submitted Docs","Selected Docs", "Client Decks", "Finalized Decks", "Summary", "Edit"].map((label) => {
                                        return <Tab key={label} label={label} />
                                    })}
                                </Tabs>
                              </Box>

                              {
                                this.renderTab()
                              }
                            </Box>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEventPage