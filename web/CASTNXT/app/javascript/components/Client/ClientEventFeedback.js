import React, {Component} from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Slide from "../Forms/Slide";


class ClientEventFeedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schema: props.properties.data.schema,
            uischema: props.properties.data.uischema,
            slides: props.properties.data.slides,
            entries: [],
            page:0,
            rowsPerPage: 1,
            feedback: "",
            clientComments: [],
            commentContent: "",
            clientId: props.properties.data.clientId,
            disableSubmit: false
        }
    }
    
    componentDidMount() {
      let slides = this.state.slides
      let entries = []
      let clientComments = []
      let slideComments = []
      
      for(var key in slides) {
        entries.push({
          ...slides[key],
          id: key,
        }) 

        slideComments = []
        for(var j = 0; j < slides[key].comments.length; j++){
          slideComments.push(this.state.slides[key].comments[j])
        }
        clientComments.push(slideComments)
      }
        
      this.setState({
          entries: entries,
          clientComments: clientComments
      })
    }
    
    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    };
    
    handleChangeRowsPerPage = (event) => {
      this.setState({
        rowsPerPage: event.target.value
      })
    }

    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitComment = (slideId) => {
      const payload = {
        content: this.state.commentContent,
        owner: properties.name,
        slide_id: slideId,
        client_id: this.state.clientId
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

    generatePDF = () => {

      const report = new JsPDF('landscape','px','a4');
      // report.html(document.querySelector('report')).then(() => {
      //     report.save('report.pdf');
      // },
      // html2canvas: {scale:0.1}
      // )

      report.html(document.querySelector('report'), {
        callback: function (report) {
          report.save();
        },      
        html2canvas:{scale:0.5}
      });
    }
    
    render() {
        return(
          <report>
            <div>
                <div style={{marginTop: "1%"}}>

                    <div className="col-md-8 offset-md-2">
                      <Paper>
                        <TableContainer>
                          <Table size="medium">
                            <TableBody>
                              {this.state.entries
                                  .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                  .map((row, index) => {
                                    return(
                                      <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                      >

                                        <TableCell>
                                          <Slide
                                            schema={this.state.schema}
                                            uiSchema={this.state.uischema}
                                            formData={row.formData}
                                            children={true}
                                            disabled
                                          />
                                          
                                          <br />
                                          
                                          Comments:
                                          
                                          <br />

                                          <List>
                                            {this.state.clientComments[this.state.page].map((comment) =>(
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

                                          <Button disabled={this.state.disableSubmit} variant="contained" onClick={() => this.submitComment(row.id)}>Submit Comment</Button><br />
                                          
                                          <br />

                                          <Button onClick={() => this.generatePDF()}>Export PDF</Button>

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

                </div>
                
            </div>
          </report>
        )
    }
}

export default ClientEventFeedback