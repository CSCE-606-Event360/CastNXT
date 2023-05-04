import React, {useState, Component} from "react"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {UsStates, getCities} from '../../utils/FormsUtils';

const commonStyle = {marginTop: "20px", marginBottom: "20px"};

const LocationFilter = (props) => {

    const [cityName, setCity] = useState(null)
    const [stateName, setState] = useState(null)

    const onValueChange= (stateName, cityName) => {
        setCity(cityName);
        setState(stateName);
        props.handleLocationFilterChange(stateName,cityName)
    };

    return (
    <div>
    <FormControl fullWidth>
        <InputLabel id="state-select-label" style={commonStyle}>Event State</InputLabel>
        <Select onChange ={((e) => onValueChange(e.target.value, cityName))} labelId="state-select-label" id="state-select" name="stateName"  label="Event state" value={stateName} variant="outlined" style={commonStyle}>
        <MenuItem>All</MenuItem>
        {
            UsStates.map((state) =>{
                return (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                )
            })
        }
        </Select>
    </FormControl>

    <FormControl fullWidth>
        <InputLabel id="city-select-label" style={commonStyle}>Event Location</InputLabel>
        <Select onChange ={((e) => onValueChange(stateName, e.target.value))} labelId="city-select-label" id="state-select" name="location" label="Event Location" value={cityName} variant="outlined" style={commonStyle}>
        <MenuItem>All</MenuItem>
        {
            getCities(stateName).map((city) =>{
                return (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                )
            })
        }
        </Select>
    </FormControl>
    </div>);
}

export default LocationFilter;