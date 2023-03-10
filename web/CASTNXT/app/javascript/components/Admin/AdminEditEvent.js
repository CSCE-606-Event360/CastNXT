import React, {Component} from "react"
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import Header from "../Navbar/Header";
import FormBuilderContainer from "../Forms/FormBuilder.js"
import Slide from "../Forms/Slide.js"
import "./Admin.css";
import "../Forms/Forms.css";
import {getSchema, UsStates, getCities, EventCategories} from '../../utils/FormsUtils';
import { FormHelperText } from "@mui/material";
import DatePickerWrapper from "../Shared/DatePicker";

const commonStyle = {marginTop: "20px", marginBottom: "20px"}

class AdminEditEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabValue: 0,
            selectedFormNo: "",
            schema: JSON.stringify(getSchema('No').dataSchema),
            uischema: JSON.stringify(getSchema('No').uiSchema),
            title: this.props.properties.data.title,
            description: this.props.properties.data.description,
            location: this.props.properties.data.location,
            statename: this.props.properties.data.statename,
            eventdate: this.props.properties.data.eventdate,
            category: this.props.properties.data.category,
            is_paid_event: this.props.properties.data.is_paid_event,
            formIds: properties.formIds !== undefined ? properties.formIds : [],
            formData: null,
            newFormData: {},
            newFormId: "",
            disableSubmit: false,
            status: "",
            message: ""
        }
    }
    
    handleTabChange = (event, newValue) => {
        this.setState({
            tabValue: newValue
        })
      };
    
    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRadioChange = (e, value) => {
        const {dataSchema, uiSchema} = getSchema(e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
            schema: JSON.stringify(dataSchema),
            uischema: JSON.stringify(uiSchema)
        })
    }
    
    onFormDataChange = (newFormData) => {
        this.setState({
            newFormData: newFormData.formData
        })
    }
    
    onSchemaChange = (newSchema) => {
        this.setState({
            schema: newSchema
        })
    }
    
    onUISchemaChange = (newUISchema) => {
        this.setState({
            uischema: newUISchema
        })
    }
    
    onFormLoadClick = () => {
        axios.get("/admin/forms/" + this.state.selectedFormNo)
        .then((res) => {
          let parsedData = JSON.parse(res.data.formData.data)
            this.setState({
                formData: parsedData,
                schema: JSON.stringify(parsedData["schema"]),
                uischema: JSON.stringify(parsedData["uischema"])
            })
        })
        .catch((err) => {
            if(err.response.status === 403) {
                window.location.href = err.response.data.redirect_path
            } else {
                window.alert("Error: Could not Load Form " + this.state.selectedFormNo)
            }
        })
    }
    
    onEditEventClick = () => {

        this.setState({
            disableSubmit: true
        })
      
        axios.post("/admin/forms", {
            data:JSON.stringify({
                schema: JSON.parse(this.state.schema),
                uischema: JSON.parse(this.state.uischema)
            })
        })
        .then((res) => {
            this.setState({
                newFormId: res.data.formId
            })

            return axios.put("/admin/events/" + this.props.properties.data.id, {
                form_id: this.state.newFormId,
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                statename: this.state.statename,
                eventdate: this.state.eventdate,
                category: this.state.category, 
                is_paid_event: this.state.is_paid_event
            })

        })
        .then((res) => {
            this.setState({
                status: true,
                message: res.data.comment
            })
            
            setTimeout(() => {
                window.location.href = "/admin"
            }, 2500)
        })
        .catch((err) => {
            this.setState({
                status: false,
                message: err.response.data.comment,
                disableSubmit: false
            })
            
            if(err.response.status === 403) {
                window.location.href = err.response.data.redirect_path
            }
        })
    }

    onLocationClick = (name) => {
        this.setState({
            [`is${name}Focused`]: true
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
                        <h2>Edit Event</h2>
                        <hr style={{ margin: "auto", width: "60%" }} />
                        <br />
                        <Button variant="outlined" onClick={this.back}>Back to Homepage</Button>
                        
                        <br /><br />
                        <div className="container" style={{ backgroundColor: "white", height: "100%", width: "50vw", paddingTop: "1%" }}>
                            <p>Step 1</p>
                            <div className="input-fields">
                              <TextField id="title-textfield" name="title" label={this.props.properties.data.title} variant="outlined" onChange={this.handleChange} defaultValue={this.props.properties.data.title} />
                              <TextField id="description-textfield" name="description" label={this.props.properties.data.description} variant="outlined" onChange={this.handleChange} defaultValue={this.props.properties.data.description} style={commonStyle}/>
                              <DatePickerWrapper id='eventdate' name='eventdate' variant='outlined' onChange={this.handleChange} value={this.props.properties.data.eventdate} style={commonStyle} />
                              <FormControl fullWidth>
                                <InputLabel id="state-select-label" style={commonStyle}>{this.props.properties.data.statename}</InputLabel>
                                <Select labelId="state-select-label" id="state-select" name="statename"  label={this.props.properties.data.statename} variant="outlined" onChange = {this.handleChange} defaultValue={this.props.properties.data.statename} style={commonStyle}>
                                    {
                                        UsStates.map((state) =>{
                                            return (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                              </FormControl>
                              <FormControl fullWidth error={this.state.islocationFocused &&!this.state.statename}>
                                <InputLabel id="city-select-label" style={commonStyle}>{this.props.properties.data.location}</InputLabel>
                                <Select onClick={() => this.onLocationClick('location')} labelId="city-select-label" id="state-select" name="location" label={this.props.properties.data.location} variant="outlined" onChange = {this.handleChange} defaultValue={this.props.properties.data.location} style={commonStyle}>
                                    {
                                        getCities(this.state.statename).map((city) =>{
                                            return (
                                                <MenuItem key={city} value={city}>{city}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                {this.state.islocationFocused && !this.state.statename ? <FormHelperText>Please Select State to see list of cities.</FormHelperText> : null}
                              </FormControl>
                              <FormControl>
                                <InputLabel id="category-select-label" style={commonStyle}>{this.props.properties.data.category}</InputLabel>
                                <Select labelId="category-select-labelId" id="category-select" name="category" label={this.props.properties.data.category} variant="outlined" onChange = {this.handleChange} defaultValue={this.props.properties.data.category} style={commonStyle}>
                                    {
                                        EventCategories.Categories.map((category) =>{
                                            return (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                              </FormControl>
                              <div> 
                              <h6>Is this a paid event ?</h6>
                              <input type = "radio" name = "is_paid_event" value = "Yes" onChange={this.handleRadioChange} style={{marginLeft: "20px", marginRight: "10px"}}/> Yes
                              <input type = "radio" name = "is_paid_event" value = "No" onChange={this.handleRadioChange} style={{marginLeft: "20px", marginRight: "10px"}}/> No
                              </div>
                            </div>
                            
                            <br/>
                            
                            <p>Step 2</p>
                            <div>
                                <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                    <Tab style={{focus: "color: #719ECE"}} label="Choose Existing Form" />
                                    <Tab label="Create New Form" />
                                </Tabs>
                                <hr style={{ color: "black" }} />
                            </div>
                            
                            {this.state.tabValue === 0 &&
                                <div>
                                    <div className="flex-row">
                                        <div style={{flex:1, marginRight:"10px"}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Form number</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Form number"
                                                    value={this.state.selectedFormNo}
                                                    onChange={(event)=>{this.setState((state, props) => {
                                                        return {selectedFormNo: event.target.value, formData: null};
                                                    });
                                                    }}
                                                >
                                                    {this.state.formIds.map(formId => {
                                                        return (
                                                            <MenuItem key={formId[0]} value={formId[0]}>Form {formId[1]}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        
                                        <Button variant="contained" style={{flex:1}} onClick={this.onFormLoadClick}>Load this form</Button>
                                    </div>
                                    
                                    <br />
                                    
                                    {this.state.selectedFormNo && this.state.formData &&
                                        <div className="form-preview">
                                            <p className="preview-title">Form preview: </p>
                                            <Slide
                                                schema={this.state.formData.schema}
                                                uiSchema={this.state.formData.uiSchema}
                                                formData={{}}
                                                onFormDataChange={() => {}}
                                            />
                                        </div>
                                        
                                    }
                                </div>
                            }

                            {this.state.tabValue === 1 &&
                                <FormBuilderContainer 
                                    schema={this.state.schema}
                                    uischema={this.state.uischema} 
                                    onSchemaChange={this.onSchemaChange}
                                    onUISchemaChange={this.onUISchemaChange}
                                    onFormDataChange={this.onFormDataChange}
                                    formData={this.state.newFormData}
                                />
                            }
                            
                            <br /><br />
                            
                            <Button disabled={this.state.disableSubmit} variant="contained" onClick={this.onEditEventClick}>Edit Event</Button>
                            
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
            </div>
        )
    }
}

export default AdminEditEvent