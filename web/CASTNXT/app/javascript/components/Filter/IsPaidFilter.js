import React, {Component} from "react"

let IsPaidFilter = (props) => {

    const onPaidFilterChanged = (event) => {
        props.isPaidFilterSelected(event.target.value)
    }

    return (
    <div>
        <select name = "isPaid" onChange = {onPaidFilterChanged}>
            <option value = "None">None</option>
            <option value = "Yes">Yes</option>
            <option value = "No">No</option>
        </select>
    </div>); 
}

export default IsPaidFilter;