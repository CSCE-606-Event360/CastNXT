import React, { Component } from "react";
import {FormBuilder} from "@ginkgo-bioworks/react-json-schema-form-builder";
import Webcam from "react-webcam";

import Slide from "./Slide.js";
import "./Forms.css";

const customFormInputs = {
  array: {
    displayName: "File",
    matchIf: [
      {
        types: ["string"],
        widget: "file"
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "file"
    },
    type: "string",
    format: "data-url",
  },
};

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileKey: '',
      webcamRef: null
    }
  }

  // Callback to set the reference to the webcam component
  setWebcamRef = (webcamRef) => {
    this.setState({ webcamRef });
  }

  // Method to capture an image from the webcam
  captureImageFromCamera = () => {
    const webcamRef = this.state.webcamRef;
    if (webcamRef) {
      const imageSrc = webcamRef.getScreenshot();
      // 'imageSrc' contains the captured image in a base64 data URL format

      // Handle the captured image as needed in your application
      console.log("Captured image data URL:", imageSrc);
      return imageSrc
    }
  }

  changeSchema = (dataSchemaObj, uiSchemaObj, fileKey, editedKey,capturedImageFile) =>{
    const idx = uiSchemaObj['ui:order'].findIndex((ele) => ele===fileKey);
    uiSchemaObj['ui:order'][idx] = editedKey; 
    delete Object.assign(uiSchemaObj, {[editedKey]: uiSchemaObj[fileKey]})[fileKey];
    delete Object.assign(dataSchemaObj.properties, {[editedKey]: dataSchemaObj.properties[fileKey]})[fileKey];
    if (capturedImageFile) {
      dataSchemaObj.properties[editedKey].default = capturedImageFile;
    }
    return {dataSchemaObj, uiSchemaObj}
  }

  checkUiSchemaForFiles = (dataSchema,uiSchema,capturedImageFile) => {
    let dataSchemaObj = JSON.parse(dataSchema);
    let uiSchemaObj = JSON.parse(uiSchema);
    const fileKey = Object.keys(uiSchemaObj).find((key) => !Array.isArray(uiSchemaObj[key]) && uiSchemaObj[key]["ui:widget"] === 'file'); 
    //Append file prefix in-order to handle this field in table later.
    let changedSchema = {dataSchemaObj, uiSchemaObj}
    if(fileKey && !this.state.fileKey){
      const editedKey = `file_${fileKey}`;
      changedSchema = this.changeSchema(dataSchemaObj, uiSchemaObj, fileKey, editedKey,capturedImageFile);
    } else if(!fileKey && this.state.fileKey){
      //Check if a prev file key has been updated.
      //Remove edited key, and revert.
      const editedKey = `file_${this.state.fileKey}`;
      changedSchema = this.changeSchema(dataSchemaObj, uiSchemaObj, editedKey, this.state.fileKey,capturedImageFile);
    }
    this.setState({
      fileKey
    })
    return changedSchema;
  }

  onFormBuilderChange = (newSchema, newUiSchema) => {
    console.log(newSchema);
    console.log(newUiSchema);
    const capturedImageFile = this.captureImageFromCamera();
    const { dataSchemaObj, uiSchemaObj } =  this.checkUiSchemaForFiles(newSchema,newUiSchema,capturedImageFile);
    this.props.onSchemaChange(JSON.stringify(dataSchemaObj));
    this.props.onUISchemaChange(JSON.stringify(uiSchemaObj));
  }
  
  render() {
    return (
      <>
        <h4>Add fields to the following form.</h4>
        <div className="container" style={{ backgroundColor: "white", height: "100%", textAlign: 'left'}}>
          {/* Delete this - just for testing */}
        <Webcam
          audio={false}
          ref={this.setWebcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={this.captureImageFromCamera}>Capture Image from Camera</button>
      
        <div>
          <FormBuilder
            schema={this.props.schema}
            uischema={this.props.uischema}
            onChange={(newSchema, newUiSchema) => this.onFormBuilderChange(newSchema,newUiSchema)}
            mods={
              {
                customFormInputs,
                showFormHead: false,
              }
            }
          />
          </div>
          <div className="form-preview">
                <p className="preview-title">Form preview: </p>
                <Slide
                  schema={JSON.parse(this.props.schema)}
                  uiSchema={JSON.parse(this.props.uischema)}
                  formData={this.props.formData}
                  onFormDataChange={this.props.onFormDataChange}
                />
            </div>
        </div>
        </>
    );
  }
}

export default FormBuilderContainer