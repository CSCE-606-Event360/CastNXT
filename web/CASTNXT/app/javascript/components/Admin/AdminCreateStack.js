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
import Alert from "@mui/material/Alert";
import axios from "axios";

import Slide from "../Forms/Slide";
import { slidesToEntries } from "../../utils/AdminDataUtils";

class AdminCreateStack extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            schema: props.properties.data.schema !== undefined ? props.properties.data.schema : [],
            uiSchema: props.properties.data.uischema !== undefined ? props.properties.data.uischema : [],
            formData: [],
            dataSlides: {},
            entries: [],
            curatedStack: [],
            showStack: false,
            stackOnlyMode: false,
            client: "",
            page:0,
            rowsPerPage: 1,
            status: "",
            message: ""
        }
    }
    
    componentWillReceiveProps(props) {
      let slides = props.rowData || props.properties.data.slides
      const entries = slidesToEntries (slides);
      
      this.setState({
        entries,
        curatedStack: props.currentStack,
        showStack: props.showStack,
        stackOnlyMode: props.stackOnlyMode
      })
    }

    componentDidMount() {
      let slides = this.props.rowData || this.props.properties.data.slides
      const entries = slidesToEntries (slides);

      this.setState({
        entries: entries,
        curatedStack: this.props.currentStack,
        showStack: this.props.showStack,
        stackOnlyMode: this.props.stackOnlyMode,
        dataSlides: this.props.properties.data.slides
      })
    }
    
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
    changeStack = (row) => {
      const dataSlides = this.state.dataSlides;

      //toggle for masterStackCall
      dataSlides[`${row.id}`].curated = !row.curated;
      this.setState({
        dataSlides
      });
      this.props.onCurate(row);
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
    
    makeMasterStack = () => {
      const slides = this.state.dataSlides;

      Object.keys(slides).forEach(key => slides[key].formData = JSON.stringify(slides[key].formData));

      const baseURL = window.location.href.split("#")[0]
      
      const payload = {
        clients: this.props.properties.data.clients,
        slides: slides
      }
      
      axios.post(baseURL+"/slides/", payload)
      .then((res) => {
        this.setState({
          status: true,
          message: res.data.comment
        })
        window.location.reload();
      })
      .catch((err) => {
        this.setState({
          status: false,
          message: "Failed to curate Submitted Docs!"
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
                    
                    <div>
                      {
                        !this.state.stackOnlyMode && <div className="col-md-8 offset-md-2">
                        <hr />  
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
                                            
                                            <div style={{textAlign: "right"}}>
                                              {!row.curated? (
                                                <Button onClick={() => this.changeStack(row)} variant="contained" color="success">Add</Button>
                                              ) : (
                                                <Button onClick={() => this.changeStack(row)} variant="contained" color="error">Remove</Button>
                                              )}
                                            </div>
                                            
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
                      }
                      
                      {this.state.showStack &&
                        <div tabIndex="-1" id="curated">
                        <hr />
                          <table>
                            <thead>
                              <tr><td>Current Stack</td></tr>
                            </thead>
                            <tbody>
                              {this.state.curatedStack.map((row, index) => {
                                return(
                                  <tr key={index}>
                                    <td>{row.talentName}</td>
                                  </tr>
                                )
                                })
                              }
                            </tbody>
                          </table>
                          <br />
                          
                          <Button variant="contained" onClick={this.makeMasterStack}>Submit</Button><br /><br />
                          <hr />
                        </div>
                      }
                      
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

export default AdminCreateStack