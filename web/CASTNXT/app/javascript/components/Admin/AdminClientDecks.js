import React, {Component} from "react"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Slide from "../Forms/Slide";

class AdminClientDecks extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            client: "",
            clientOptions: [],
            clientList: props.properties.data.clients,
            clientDecks: {},
            slides: props.properties.data.slides,
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uischema !== undefined ? props.properties.data.uischema : [],
            page:0,
            rowsPerPage: 1,
            expandSlides: false,
            message: "",
            status: "",
            clientComments: {},
            commentContent: "",
            disableSubmit: false
        }
    } 
    
    componentDidMount = () => {
        let clientOptions = []
        let clients = this.state.clientList
        let slides = this.state.slides
        let clientDecks = {}
        let clientComments = {}
        let clientSlideComments = {}
        
        
        for(var key in clients) {
          if(clients[key].slideIds.length > 0) {
            clientOptions.push(
                <MenuItem key={key} value={key}>{clients[key].name}</MenuItem>    
            )
            
            clientDecks[key] = []
            clientComments[key] = []

            clients[key].finalizedIds = clients[key].finalizedIds === null ? [] : clients[key].finalizedIds 
  
            for(var i=0; i<clients[key].slideIds.length; i++) {
              clientDecks[key].push({
                ...this.state.slides[clients[key].slideIds[i]],
                slideId: clients[key].slideIds[i],
                finalized: clients[key].finalizedIds.includes(clients[key].slideIds[i]),
                preference: (i+1),
                preferenceSubmitted: clients[key].preferenceSubmitted
              })

              clientSlideComments = []

              for(var j=0; j<this.state.slides[clients[key].slideIds[i]].comments.length; j++){
                clientSlideComments.push(
                  this.state.slides[clients[key].slideIds[i]].comments[j]
                )
              }
              clientComments[key].push(clientSlideComments)
            } 
          }
        }
        
        this.setState({
            clientOptions: clientOptions,
            clientDecks: clientDecks,
            clientComments: clientComments
        })
    }
    
    handleClientChange = (clientSelection) => {
        this.setState({
            client: clientSelection.target.value,
            expandSlides: false
        })
    }
    
    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    };
    
    handleChangeRowsPerPage = (event, num) => {
      this.setState({
        rowsPerPage: event.target.value
      })
    }

    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    expandSlides = () => {
      this.setState({
        expandSlides: !this.state.expandSlides
      })
    }
    
    updateFinalizedForClient = (client, clientDecks, finalizedSlides) => {
      const payload = {
        client_id: client,
        finalSlides: finalizedSlides
      }
      
      const baseURL = window.location.href.split("#")[0]
      
      axios.post(baseURL + "/negotiations", payload)
        .then((res) => {
          this.props.properties.data.clients[client].finalizedIds = finalizedSlides
          
          this.setState({
            status: true,
            message: res.data.comment
          })
        })
        .catch((err) => {
          this.setState({
            status: false,
            message: "Failed to Finalize Talent!"
          })
          
          if(err.response.status === 403) {
            window.location.href = err.response.data.redirect_path
          }
        })
    }
    
    finalizeTalent = (talent) => {
      let client = this.state.client
      let clientDecks = this.state.clientDecks
      let finalizedSlides = []
      
      

      for(var i=0; i<clientDecks[client].length; i++) {
        if(clientDecks[client][i].slideId === talent.slideId) {
          clientDecks[client][i].finalized = !talent["finalized"]
        }
        
        if(clientDecks[client][i].finalized) {
          finalizedSlides.push(clientDecks[client][i].slideId)
        }
      }
      
      this.updateFinalizedForClient(client, clientDecks, finalizedSlides)
      
      this.setState({
        clientDecks: clientDecks
      })
    }

    submitComment = (slideId) => {
      const payload = {
        content: this.state.commentContent,
        owner: properties.name,
        slide_id: slideId,
        client_id: this.state.client
      }

      const baseURL = window.location.href.split("#")[0]
      
      this.setState({
        disableSubmit: true
      })

      return axios.post(baseURL + "/slides/" + slideId + "/comments", payload)
      .then((res) => {
        this.setState({
          status: true,
          message: res.data.comment
        })
        setTimeout(() => {
          window.location.href = ""
        }, 2500)
      })
      .catch((err) => {
        this.setState({
          status: false,
          message: "Failed to submit comment!"
        })
        
        if(err.response.status === 403) {
          window.location.href = err.response.data.redirect_path
        }
      })
    }

    
    render() {
        let selectStyle = {
          backgroundColor: "#B5DDA4"
        }
      
        return(
            <div>
                <br />
                <FormControl variant="standard">
                    <p>Select a client below to view their slide deck</p>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      options={this.state.clientOptions}
                      value={this.state.client}
                      onChange={(option) => this.handleClientChange(option)}
                      label="Select Client"
                      autoWidth
                    >
                        {this.state.clientOptions}
                    </Select>
                </FormControl>
                
                <br /><br />
                
                {this.state.client !== "" &&
                    <div>
                        <div className="col-md-8 offset-md-2">
                        
                            <TableContainer>
                              <Table size="medium" sx={{ minWidth: 200, width: 250 }}>
                                <TableHead style={{ backgroundColor: "#3498DB" }}>
                                  <TableRow>
                                    <TableCell align="center">Preference</TableCell>
                                    <TableCell align="center">Talent Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.clientDecks[this.state.client]
                                      .map((row, i) => {
                                        return(
                                          <TableRow key={i} style={row.finalized ? selectStyle : {}}>
                                              <TableCell align="center">{row.preference}</TableCell>
                                              <TableCell align="center">{row.talentName}</TableCell>
                                              {!row.finalized &&
                                              <>
                                                <TableCell align="center">Not Finalized</TableCell>
                                                <TableCell>
                                                  <Button 
                                                    size="small" 
                                                    color="success" 
                                                    variant="contained" 
                                                    onClick={() => this.finalizeTalent(row)} 
                                                    disableElevation>Finalize</Button>
                                                </TableCell>
                                              </>
                                              }
                                              {row.finalized &&
                                              <>
                                                <TableCell align="center">Finalized</TableCell>
                                                <TableCell>
                                                  <Button 
                                                    size="small" 
                                                    color="error" 
                                                    variant="contained" 
                                                    onClick={() => this.finalizeTalent(row)} 
                                                    disableElevation>Remove</Button>
                                                </TableCell>
                                              </>
                                              }
                                          </TableRow>
                                        )
                                    })
                                  }
                                </TableBody>
                              </Table>
                            </TableContainer>
                            
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

                            <br />
                            <Button variant="contained" onClick={this.expandSlides}>Expand Deck</Button><br /><br />

                            {this.state.expandSlides &&
                            <Paper>
                              <TableContainer>
                                <Table size="medium">
                                  <TableBody>
                                    {this.state.clientDecks[this.state.client]
                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        .map((row) => {
                                          return(
                                            <TableRow
                                              key={row.slideId}
                                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
  
                                              <TableCell>
                                                <Slide
                                                  disabled
                                                  schema={this.state.schema}
                                                  uiSchema={this.state.uiSchema}
                                                  formData={row.formData}
                                                  children={true}
                                                />

                                                <br />

                                                Comments:
                                                
                                                <br />     

                                                
                                                <List>
                                                  {this.state.clientComments[this.state.client][this.state.page].map((comment) =>(
                                                    <ListItem
                                                      key = {comment.commentContent}
                                                    >
                                                    
                                                      <ListItemText primary={`${comment.commentContent}`} secondary={`${comment.commentOwner}`} />

                                                    </ListItem>

                                                  ))}
                                                </List>
                                                

                                                <br />   

                                                <TextField id="title-textfield" name="commentContent" onChange={this.handleChange} defaultValue="Enter Comment" />

                                                <br />

                                                <Button disabled={this.state.disableSubmit} variant="contained" onClick={() => this.submitComment(row.slideId)}>Submit Comment</Button><br />

                                              </TableCell>

                                              
                                            </TableRow>
                                          )
                                      })
                                    }
                                  </TableBody>
                                  
                                  <TableFooter>
                                    <TableRow>
                                      <TablePagination
                                        rowsPerPageOptions={[1]}
                                        count={this.state.clientDecks[this.state.client].length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                        onPageChange={this.handleChangePage}
                                      />
                                    </TableRow>
                                  </TableFooter>
                                  
                                </Table>
                              </TableContainer>
                            </Paper>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default AdminClientDecks