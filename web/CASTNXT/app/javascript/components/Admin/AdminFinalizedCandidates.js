import React, {Component} from 'react'
import { Paper } from '@material-ui/core'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@material-ui/data-grid';

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
    
    render() {
        return(
            <div>
                <h4 style={{marginTop: '10px'}}>Finalized Decks</h4>
                
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
                      <DataGrid
                        rows={this.state.rows}
                        columns={this.state.columns}
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