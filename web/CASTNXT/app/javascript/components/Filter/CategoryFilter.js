import React from "react"

let CategoryFilter = (props) => {
    
    const onCategoryFilterValueChanged = (event) => {
        props.categoryFilterValueSelected(event.target.value)
    }
    
    return (
    <div>
        <select name = "Category" onChange = {onCategoryFilterValueChanged}>
            <option value = "All">All</option>
            <option value = "Fashion">Fashion</option>
            <option value = "Music">Music</option>
            <option value = "Performing Arts">Performing Arts</option>
            <option value = "Other">Other</option>
        </select>
    </div>); 
}

export default CategoryFilter;