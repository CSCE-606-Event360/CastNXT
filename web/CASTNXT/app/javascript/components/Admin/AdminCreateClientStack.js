import React, {Component} from "react"
import Form from "@rjsf/core";
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
import { MultiSelect } from "react-multi-select-component";
import Alert from "@mui/material/Alert";
import axios from "axios";

import Slide from "../Forms/Slide";


class AdminCreateClientStack extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uischema !== undefined ? props.properties.data.uischema : [],
            formData: [],
            entries: [],
            curatedStack: [],
            showStack: false,
            clients: [],
            page:0,
            rowsPerPage: 1,
            clientOptions: [],
            clientSelections: [],
            status: "",
            message: ""
        }
    }
    
    componentDidMount() {
        let entries = []
        let slides = this.props.properties.data.slides
        let clientOptions = []
        let clients = this.props.properties.data.clients
  
        for(var key in slides) {
          entries.push({
            ...slides[key],
            id: key,
            clients: []
          }) 
        }

        entries = entries.filter(row => row["curated"] === true)
        
        for(var key in clients) {
          clientOptions.push({
            label: clients[key].name,
            value: key
          }) 
          
          for(var i=0; i<clients[key].slideIds.length; i++) {
            for(var j=0; j<entries.length; j++) {
              if(entries[j].id === clients[key].slideIds[i]) {
                entries[j].clients.push({
                  label: clients[key].name,
                  value: key
                })
              }
            }
          }
        }
        
        this.setState({
            entries: entries,
            clientOptions: clientOptions
        })
    }
    
    handleClientChange = (clients, row) => {
      let i, entries = this.state.entries
      
      for(i=0; i<entries.length; i++) {
        if(entries[i].id === row["id"]) {
          entries[i]["clients"] = clients
        }
      }
      
      this.setState({
        entries: entries,
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
    
    updateFormData = (newFormData, row) => {
      let entries = this.state.entries
      for(var i=0; i<entries.length; i++) {
        if(row.id === entries[i].id) {
          entries[i].formData = newFormData.formData
          entries[i].updated = true
        }
      }
      
      this.setState({
        entries: entries
      })
    }
    
    makeSlideChanges = () => {
      let entries = this.state.entries
      for(var i=0; i<entries.length; i++) {
        if(entries[i].updated === true)
          this.props.properties.data.slides[entries[i].id].formData = entries[i].formData
      }
    }
    
    updateClients = () => {
      let entries = this.state.entries
      let clients = this.props.properties.data.clients
      
      for (let i in clients) {
        clients[i].slideIds = []
        clients[i].intermediateSlides = []
        clients[i].finalSlides = []
      }
      
      for(var i=0; i<entries.length; i++) {
        let entry_clients = entries[i].clients
        
        for(var j=0; j<entry_clients.length; j++) {
          clients[entry_clients[j].value].slideIds.push(entries[i].id)
          clients[entry_clients[j].value].intermediateSlides.push(entries[i].id)
        }
      }
      
      this.makeSlideChanges()
      let slides = JSON.parse(JSON.stringify(this.props.properties.data.slides))
      
      for(var key in slides) {
        slides[key].formData = JSON.stringify(slides[key].formData)
      }
      
      const payload = {
        clients: clients,
        slides: slides
      }
      
      const baseURL = window.location.href.split("#")[0]
      
      axios.post(baseURL+"/slides/", payload)
      .then((res) => {
        this.setState({
          status: true,
          message: res.data.comment
        })
      })
      .catch((err) => {
        this.setState({
          status: false,
          message: "Failed to create Client Decks!"
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
                
                    <p>Use this page to create client-specific slide decks</p>

                    <div>

                        <div className="col-md-8 offset-md-2">
                        
                          <Paper>
                            <TableContainer>
                              <Table size="medium">
                                <TableBody>
                                  {this.state.entries
                                      .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                      .map((row) => {
                                        return(
                                          <TableRow
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                          >

                                            <TableCell>
                                              <Slide
                                                schema={this.state.schema}
                                                uiSchema={this.state.uiSchema}
                                                formData={row.formData}
                                                children={true}
                                                onFormDataChange={(newFormData) => this.updateFormData(newFormData, row)}
                                              />
                                              
                                              <br />
                                              
                                              Clients:
                                              <MultiSelect
                                                options={this.state.clientOptions}
                                                value={row["clients"]}
                                                onChange={(option) => this.handleClientChange(option, row)}
                                                style={{width: "80%"}}
                                              />
                                              
                                            </TableCell>
                                            
                                          </TableRow>
                                        )
                                    })
                                  }
                                </TableBody>
                                
                                <TableFooter>
                                  <TableRow>
                                    <TablePagination
                                      rowsPerPageOptions={[1, 2]}
                                      count={this.state.entries.length}
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
                        </div>
                        
                        <br />

                        <Button variant="contained" onClick={this.updateClients}>Update Decks</Button><br />
                        
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

export default AdminCreateClientStack