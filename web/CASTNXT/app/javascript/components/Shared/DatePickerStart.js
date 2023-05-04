import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {getSchema} from "../../utils/FormsUtils";

class DatePickerWrapperStart extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            name: props.name,
            value: new Date(props.value).getTime()

        }
    }

    onChange = (newValue) => {
        console.log(JSON.stringify(newValue))
        if (JSON.stringify(newValue) == "null"){
            return
        }
        let date
        let dateStr
        try {
            date = new Date(newValue).toISOString()
            dateStr = date.toString()
        }catch (e1) {
            console.log(e1)
        }
        const e = {
            target: {
                name: this.state.name,
                value: date
            }
        }
        this.setState({
            value: dateStr
        })
        this.props.onChange(e);
    }

    render () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Start Date"
                    //minDate={today}
                    value={this.state.value}
                    onChange={(newValue) => this.onChange(newValue)}
                    renderInput={(params) => <TextField {...params} error={false}/>}
                />
            </LocalizationProvider>
        );
    }
}

export default DatePickerWrapperStart;