import React, { Component } from "react";
import Form from "@rjsf/core";
import {getCities} from '../../utils/FormsUtils';
import "./Forms.css";

class ImageWidget extends React.Component {
    render() { 
         return (
              <div>
                <img style={{maxWidth: '80%'}} src={this.props.value}/>
              </div>
            )
    }
}

class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schema: props.schema,
      uiSchema: props.uiSchema,
      formData: props.formData,
      fields: {},
      cities: [], // Add a state variable for cities
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    let uiSchemaCopy = Object.assign({}, props.uiSchema)
    let fieldsCopy = Object.assign({}, state.fields)
    let schemaCopy = Object.assign({}, props.schema)
    let formDataCopy = Object.assign({}, props.formData)

    Object.keys(props.formData).forEach(key => {

      if(props.formData && typeof props.formData[key] === 'string' && props.formData[key].includes("data:image") && !key.includes("img_")) {
        let fieldIndex = uiSchemaCopy['ui:order'].indexOf(key)

        let uiOrder = [
          ...uiSchemaCopy["ui:order"].slice(0, fieldIndex+1),
          `img_${key}`,
          ...uiSchemaCopy["ui:order"].slice(fieldIndex+1)
        ]
        uiSchemaCopy = {
          ...uiSchemaCopy,
          [`img_${key}`] : {
            "ui:widget": "ImageWidget"
          },
          "ui:order": uiOrder
        }
        schemaCopy = {
          ...schemaCopy,
          properties: {
            ...schemaCopy.properties,
            [`img_${key}`]: {title: "Uploaded image", type: "string"}
          }
        }
        formDataCopy = {
          ...formDataCopy,
          [`img_${key}`]: props.formData[key]
        }
      }
    })
    console.log("Form Data State:", props.formData);
    const selectedState = props.formData.state; // Assuming the state field is named 'state'
    const cities = getCities(selectedState);
    console.log("Form Data Selected Cities:", cities);
    uiSchemaCopy ={
      ...uiSchemaCopy,
      city: {
        title: "City",
        "ui:placeholder": "Select one city",
        description: "Enter your city of residence.",
        enum: cities,
        type: "string"}
    }
    schemaCopy.properties.city= {
      title: "City",
      "ui:placeholder": "Select one city",
      description: "Enter your city of residence.",
      enum: cities,
      type: "string"}
      return {
            ...state,
            schema: schemaCopy,
            uiSchema: uiSchemaCopy,
            formData: formDataCopy,
            fields: fieldsCopy,
            cities: cities,
      }
  }
  
   ImageWidget = (props) => {
      return (
        <ImageWidget
          value={props.value} />
      );            
    };
  
    customizeUISchema = () => {
      const { uiSchema, cities } = this.state;
  
      // Add or modify the UI schema for the city dropdown based on your requirements
      const modifiedUISchema = {
        ...uiSchema,
        city: {
          title: "City",
          "ui:placeholder": "Select a city",
          description: "Enter your city of residence.",
          enum: cities,
          type: "string"
      }
       
      // enumOptions: cities.map((city) => ({ label: city, value: city })),

      };
      console.log(modifiedUISchema);
      console.log(this.state.uiSchema);
      return modifiedUISchema;
    };
  
  
  render() {
    // schema and uiSchema are to be used from state and not props since image preview is being added in state
    const { onFormDataChange, onSubmit, schema, uiSchema, formData, ...restProps} = this.props
    
    const widgets = {
      ImageWidget: this.ImageWidget
    };
      
    return (
        <div className="container" style={{ backgroundColor: "white", height: "100%"}}>
          <Form
              schema={this.state.schema}
              uiSchema={this.state.uiSchema} // Use the customized UI schema
              onChange={this.props.onFormDataChange}
              formData={this.state.formData}
              submitButtonMessage={"Submit"}
              onSubmit={this.props.onSubmit}
              widgets={widgets} 
              {...restProps}
            />
        </div>
    );
  }
}

export default Slide