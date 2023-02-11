import React, {Component} from 'react'
import { Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import {DATA_GRID_TYPES_MAP} from '../../utils/DataParser';
import { extendedNumberOperators } from '../../utils/RangeFilter';

class AdminEventSummary extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            eventTalent: [],
            rows: [],
            columns: []
        }
    }
    
    findAssignedClients = (slideId) => {
      let clients = this.props.properties.data.clients
      let assignedClients = ''
      for(var key in clients) {
        if(clients[key].finalizedIds.indexOf(slideId) !== -1) {
          if (assignedClients === '') {
            assignedClients = clients[key].name
          } else {
            assignedClients = assignedClients + ', ' + clients[key].name
          }
        }
      }
      return assignedClients
    }
    
    constructTableData = (eventTalent) => {
      let columns = [
        {field: 'clients', headerName: 'Clients assigned', minWidth: 200}
      ]
      let rows = []
      let schema = this.props.properties.data.schema.properties
      Object.keys(schema).forEach(key => {
        let existingColumn = columns.find(column => column.field === key)
        if (!existingColumn && !key.startsWith('file')) {
          const type = DATA_GRID_TYPES_MAP[schema[key].type];
          const columnConfig = {field: key, headerName: schema[key].title, minWidth: 150, type};
          if (type === 'number'){
            columnConfig.filterOperators = extendedNumberOperators;
          }
          columns.push({field: key, headerName: schema[key].title, minWidth: 150})
        }
      })
      // Add Name Validation for form-data.
      eventTalent.forEach((talentData, index) => {
        let row = {}
        row['id'] = index + 1
        row['clients'] = this.findAssignedClients(talentData.id)
        columns.forEach((column) => {
          if(column.field !== 'name' && column.field !== 'clients') {
            if (talentData.formData[column.field]) {
              row[column.field] = talentData.formData[column.field]
            } else {
              row[column.field] = ''
            }
          }
        })
        if (row['clients'] !== '') {
          rows.push(row) 
        }
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
        let [rows,columns] = this.constructTableData(eventTalent)
        this.setState({
            eventTalent: eventTalent,
            rows: rows,
            columns: columns
        })
    }
    
    render() {
        return(
            <div>
                <h4 style={{marginTop: '10px'}}>Event Summary</h4>
                <p>Here you will find a report of mapped clients and talents for a certain event.</p>
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

export default AdminEventSummary