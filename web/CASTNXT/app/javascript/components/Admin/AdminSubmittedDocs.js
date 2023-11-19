import React, {useState } from "react"
import { rowsToEntries, slidesToEntries } from "../../utils/AdminDataUtils";
import AdminCreateStack from "./AdminCreateStack";
import AdminUserTable from "./AdminUserTable";

const AdminSubmittedDocs = (props) =>{

    const [rowData, setRowData] = useState(null);
    const [showRowData, setShowRowData] = useState(false);
    const [stack, setStack] = useState(slidesToEntries(props?.properties?.data?.slides, true));

    /**
     * Function to handle click of the row in Filtering Table.
     * @param {*} rowData 
     * @param {*} _event 
     * @param {*} _details 
     */
    const onRowClick = (rowData, _event, _details) => {
        //initial loads and subsequent ones that follow.
        const isCurated = rowData?.curated || props?.properties?.data?.slides[`${rowData.row.uniqId}`]?.curated;
        const slideData = rowsToEntries(rowData, isCurated)
        setRowData(slideData);
        setShowRowData(true);
    }

    const onCurate = (row) => {
        let newStack = [...stack]
        if(row.curated)
            newStack = stack.filter(talent =>talent.id!==row.id);
        else 
            newStack.push(row);
        row.curated = !row.curated;
        const slideData = rowsToEntries(row, row.curated);
        setRowData(slideData);
        setStack(newStack);
    }
    
    return (
        <>
            <p>Use this page to create a master slide deck for this event.</p>
            <AdminUserTable heading="Registered Users" properties={props.properties} handleRowClick={onRowClick}/>
            {
                showRowData || stack.length>0 ? <AdminCreateStack 
                properties={props.properties} 
                rowData = {rowData}
                currentStack = {stack} 
                showStack = {stack.length>0}
                stackOnlyMode = {stack.length>0 && !showRowData} // Stack is pre-filled. But user has not clicked on any row.
                appendData={true}
                onCurate={onCurate}
                /> : null 
            } 
        </>
    )

}

export default AdminSubmittedDocs;