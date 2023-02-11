import React, {Component} from "react"
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Ref } from "semantic-ui-react"
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";


class ClientEventSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            negotiationId: props.properties.data.negotiationId,
            summaryRows: [],
            eventStatus: props.properties.data.status,
            eventId: props.properties.data.id,
            updateSuccess: "",
            status: "",
            message: ""
        }
    }
    
    componentDidMount() {
        let slides = this.props.properties.data.slides
        let finalizedIds = this.props.properties.data.finalizedIds
        let tableRows = []

        for(var key in slides) {
            tableRows.push({
                id: key,
                name: slides[key].talentName,
                finalized: finalizedIds.includes(key)
            })
        }
        
        this.setState({
            summaryRows: tableRows
        })
    }

    onDragEnd = (result) => {
        const { destination, source, reason } = result;
        
        if (!destination) {
          return;
        }
    
        const rowsOrdered = Object.assign([], this.state.summaryRows);
        const row = this.state.summaryRows[source.index];
        rowsOrdered.splice(source.index, 1);
        rowsOrdered.splice(destination.index, 0, row);
        
        this.setState({
          summaryRows: rowsOrdered,
        });
    }
    
    getItemStyle = (isDragging, draggableStyle, finalized) => {
        return finalized ? ({
            background: ("lightgreen"),
            ...draggableStyle,
        }) : ({
            background: isDragging && ("lightblue"),
            ...draggableStyle,
        })
    }
    
    updatePreferences = () => {
        let preferences = []
        
        for(var i=0; i<this.state.summaryRows.length; i++) {
            preferences.push(this.state.summaryRows[i].id)
        }
        
        const payload = {
            intermediateSlides: preferences
        }
        
        const baseURL = window.location.href.split("#")[0]
        
        axios.post(baseURL + "/negotiations", payload)
            .then((res) => {
                this.setState({
                  status: true,
                  message: res.data.comment
                })
            })
            .catch((err) => {
                this.setState({
                  status: false,
                  message: "Failed to update Event Preferences!"
                })
                
                if(err.response.status === 403) {
                  window.location.href = err.response.data.redirect_path
                }
            })
    }
    
    render() {
        return(
            <div>
                <div style={{marginTop: "2%", marginBottom: "2%"}}>
                    <span >Indicate your talent preference by dragging and dropping the rows below</span>
                </div>
                
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <Table size="small">
                            <TableHead style={{ backgroundColor: "#3498DB" }}>
                                <TableRow>
                                    <TableCell align="center">Preference</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="table">
                                    {(provided, snapshot) => (
                                      <Ref innerRef={provided.innerRef}>
                                        <TableBody {...provided.droppableProps}>
                                          {this.state.summaryRows.map((row, idx) => {
                                            return (
                                              <Draggable
                                                draggableId={row.id.toString()}
                                                index={idx}
                                                key={row.id}
                                              >
                                                {(provided, snapshot) => (
                                                <Ref innerRef={provided.innerRef}>
                                                    <TableRow {...provided.draggableProps} {...provided.dragHandleProps}
                                                        style={this.getItemStyle(
                                                          snapshot.isDragging,
                                                          provided.draggableProps.style,
                                                          row.finalized 
                                                        )}
                                                        key={row.id}
                                                    >
                                                        <TableCell align="center">{idx+1}</TableCell>
                                                        <TableCell align="center">{row.name}</TableCell>
                                                    </TableRow>
                                                </Ref>
                                                )}
                                            </Draggable>)
                                          })}
                                          {provided.placeholder}
                                        </TableBody>
                                      </Ref>
                                    )}
                                  </Droppable>
                            </DragDropContext>
                        </Table>
                        <br />
                        {this.state.eventStatus !== "FINALIZED" &&
                            <Button size="small" variant="contained" onClick={this.updatePreferences}>Update Preferences</Button>
                        }
                        
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
        )
    }
}

export default ClientEventSummary