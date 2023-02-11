import React, {Component} from 'react'
import { Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import {DATA_GRID_TYPES_MAP} from '../../utils/DataParser';
import { extendedNumberOperators } from '../../utils/RangeFilter';

class AdminUserTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            eventTalent: [],
            rows: [],
            columns: [],
            filterModel: {items: []}
        }
    }
    
    constructTableData = (eventTalent) => {
      let columns = []
      let rows = []
      let schema = this.props.properties.data.schema.properties
      Object.keys(schema).forEach(key => {
        if(!key.startsWith('file')){
          const type = DATA_GRID_TYPES_MAP[schema[key].type];
          const columnConfig = {field: key, headerName: schema[key].title, minWidth: 150, type};
          if (type === 'number'){
              columnConfig.filterOperators = extendedNumberOperators;
          }
          columns.push(columnConfig);
        }
      })
      eventTalent.forEach((talentData, index) => {
        let row = {}
        row['id'] = index + 1;
        row['uniqId'] = talentData.id;
        row['talentName'] = talentData.name;
        columns.forEach((column) => {
            row[column.field] = ''
            if (talentData.formData[column.field]) {
              row[column.field] = talentData.formData[column.field]
            }
        })
        rows.push(row) 
      })
      return [rows,columns]
    }

    createEventTalentData() {
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
      return eventTalent;
    }

    componentDidMount() {
        let eventTalent = this.createEventTalentData()
        let [rows,columns] = this.constructTableData(eventTalent)
        this.setState({
            eventTalent: eventTalent,
            rows: rows,
            columns: columns
        })
    }

    onRowClick = (rowData) => {
      const talentData = this.state.eventTalent[rowData.id-1];
      rowData.row = talentData;
      rowData.row.uniqId = talentData.id;
      rowData.row.talentName = talentData.name;
      this.props.handleRowClick(rowData);
    }

    onFilterModelChange = (model) => {
      this.setState({
        filterModel: model
      })
    }
    
    render() {
        return(
            <div>
                <h4 style={{marginTop: '10px'}}>Registered Users.</h4>
                
                <div>
                  <div className="col-md-8 offset-md-2" style={{marginTop: '10px'}}>
                    <Paper>
                      <DataGrid
                        testId='userTableDataGrid'
                        rows={this.state.rows}
                        columns={this.state.columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                        onRowClick = {this.onRowClick}
                        filterModel = {this.state.filterModel}
                        onFilterModelChange={(model) => this.onFilterModelChange(model)}
                      />
                    </Paper>
                  </div>
                    
                </div>
            </div>    
        )
    }
}

export default AdminUserTable