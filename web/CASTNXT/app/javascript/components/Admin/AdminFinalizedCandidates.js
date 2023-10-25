import React, {Component} from 'react'
import { Paper } from '@material-ui/core'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@material-ui/data-grid';
import { saveAs } from 'file-saver';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

class AdminFinalizedCandidates extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            eventTalent: [],
            clientOptions: [],
            client: '',
            rows: [],
            columns: []
        }
    }
    
    constructTableData = (eventTalent) => {
      let columns = [{field: 'name', headerName: 'Name', minWidth: 150}]
      let rows = []
      let schema = this.props.properties.data.schema.properties
      Object.keys(schema).forEach(key => {
        let existingColumn = columns.find(column => column.field == key)
        if (!existingColumn) {
          columns.push({field: key, headerName: schema[key].title, minWidth: 150})
        }
      })
      eventTalent.forEach((talentData, index) => {
        let row = {}
        row['id'] = index + 1
        row['name'] = talentData.name
        columns.forEach((column) => {
          if(column.field !== 'name') {
            if (talentData.formData[column.field]) {
              row[column.field] = talentData.formData[column.field]
            } else {
              row[column.field] = ''
            }
          }
        })
        rows.push(row)
      })
      return [rows,columns]
    }
    
    componentDidMount() {
        let slides = this.props.properties.data.slides
        let eventTalent = []

        for(var key in slides) {
            eventTalent.push({
                id: key,
                name: slides[key].talentName,
                curated: slides[key].curated,
                formData: slides[key].formData
            })
        }
        
        eventTalent = eventTalent.filter(row => row['curated'] === true)
        
        let clientOptions = []
        let clients =  this.props.properties.data.clients
        
        for(var key in clients) {
          if(clients[key].slideIds.length > 0) {
            clientOptions.push(
                <MenuItem key={key} value={key}>{clients[key].name}</MenuItem>    
            )
          }
        }
        this.setState({
            clientOptions: clientOptions,
            eventTalent: eventTalent
        })
    }
    
    handleClientChange = (clientSelection) => {
      let selectedClient = clientSelection.target.value
      let clientIds = Object.keys(this.props.properties.data.clients)
      let selectedSlideIds = []
      clientIds.forEach(clientId => {
        if(clientId === selectedClient) {
          selectedSlideIds = this.props.properties.data.clients[clientId].finalizedIds
        }
      })
      let selectedEventTalents = []
      selectedSlideIds.forEach(slideId => {
        let selectedEventTalent = this.state.eventTalent.find(talentData => talentData.id === slideId)
        if (selectedEventTalent) {
          selectedEventTalents.push(selectedEventTalent)
        }
      })
      let [rows,columns] = this.constructTableData(selectedEventTalents)
        this.setState({
            client: selectedClient,
            rows: rows,
            columns: columns
        })
    }

    handleDownloadClick = () => {
      // Convert your data to CSV format
      const csvData = this.convertDataToCSV(this.state.rows);
  
      // Create a Blob with the CSV data
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  
      // Save the Blob as a file
      saveAs(blob, 'table_data.csv');
    };
  
    convertDataToCSV = (data) => {
      // Implement a function to convert your data to CSV format
      const headers = Object.keys(data[0]).join(',');
      const csvRows = data.map((row) => Object.values(row).join(','));
      return `${headers}\n${csvRows.join('\n')}`;
    };

    handlePayMeLinkClick = (payMeLink) => {
      if (payMeLink.includes("paypal.me") || payMeLink.includes("paypal")) {
        // Extract the text after the last "/"
        const parts = payMeLink.split("/");
        const userName = parts[parts.length - 1];
    
        // Construct the PayPal payment URL using the extracted username
        const paymentURL = `https://www.paypal.com/paypalme/${userName}`;
    
        // Redirect the user to the PayPal payment page
        window.open(paymentURL, "_blank");
      }

      if (payMeLink.includes("venmo.com") || payMeLink.includes("venmo")) {
        // Extract the text after the last "/"
        const parts = payMeLink.split("/");
        const userName = parts[parts.length - 1];
    
        // Construct the Venmo payment URL using the extracted username
        const paymentURL = `https://venmo.com/${userName}`;
    
        // Redirect the user to the Venmo payment page
        window.open(paymentURL, "_blank");
      }
    }
    
    render() {
        return(
            <div>
                {/* <h4 style={{marginTop: '10px'}}>Finalized Decks</h4> */}
                
                <FormControl variant="standard">
                    <p>Select a client below to view their finalized deck</p>
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
                <div>
                  <div className="col-md-8 offset-md-2" style={{marginTop: '10px'}}>
                    <Paper>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h4 style={{ margin: 0, flex: 1 }}>Finalized Decks</h4>
                        <div style={{ marginLeft: 'auto' }}>
                          {/* <button onClick={this.handleDownloadClick}>Download Table</button> */}
                          <IconButton color="primary" aria-label="Download Table" onClick={this.handleDownloadClick}>
                            <SaveAltIcon />
                          </IconButton>
                        </div>
                      </div>
                      <DataGrid
                        // rows={this.state.rows}
                        // columns={this.state.columns}
                        rows={this.state.rows.map((row, index) => ({
                          ...row,
                          id: index + 1,
                        }))}
                        columns={this.state.columns.map((col) => {
                          // console.log(col)
                          if (col.field === 'paymentLink') {
                            return {
                              ...col,
                              renderCell: (params) => (
                                <button
                                  onClick={() => this.handlePayMeLinkClick(params.row.paymentLink)}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                  {params.value}
                                </button>
                              ),
                            };
                          }
                          return col;
                        })}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                      />
                    </Paper>
                  </div>
                    
                </div>
            </div>    
        )
    }
}

export default AdminFinalizedCandidates