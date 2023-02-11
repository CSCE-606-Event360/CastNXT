import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class DatePickerWrapper extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      name: props.name,
      value: new Date(props.value).getTime()
    }
  }

  onChange = (newValue) => {
    const e = {
      target: {
          name: this.state.name,
          value: new Date(newValue).toISOString()
      }
    }
    this.setState({
      value: new Date(newValue).toISOString()
    })
    this.props.onChange(e);
  }

  render () {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choose Date."
          value={this.state.value}
          onChange={(newValue) => this.onChange(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
}

export default DatePickerWrapper;