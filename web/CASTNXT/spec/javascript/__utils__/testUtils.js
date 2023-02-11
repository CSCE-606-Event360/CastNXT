/* istanbul ignore file */
export const mockTableFunctions = () =>{
    const mockTableBody = jest.fn()
    jest.mock('@mui/material/TableBody', () => (props) =>{
        mockTableBody(props);
        console.log(props);
        return (<mockTableBody props={props}>{props.children}</mockTableBody>)
    })
    
    const mockTableHead = jest.fn()
    jest.mock('@mui/material/TableHead', () => (props) =>{
        mockTableHead(props);
        return (<mockTableHead props={props}>{props.children}</mockTableHead>)
    })
    
    const mockTableRow = jest.fn()
    jest.mock('@mui/material/TableRow', () => (props) =>{
        mockTableRow(props);
        return (<mockTableRow props={props}>{props.children}</mockTableRow>)
    })
    
    const mockTableContainer = jest.fn()
    jest.mock('@mui/material/TableContainer', () => (props) =>{
        mockTableContainer(props);
        return (<mockTableContainer props={props}>{props.children}</mockTableContainer>)
    })
    
    const mockTableCell = jest.fn()
    jest.mock('@mui/material/TableCell', () => (props) =>{
        mockTableCell(props);
        return (<mockTableCell props={props}>{props.children}</mockTableCell>)
    })

    const mockTable = jest.fn()
    jest.mock('@mui/material/Table', () => (props) =>{
        mockTable(props);
        return (<mockTable props={props}>{props.children}</mockTable>)
    })
    
}

export const mockTabs = () =>{
    const mockTab = jest.fn()
    jest.mock('@mui/material/Tabs', () => (props) =>{
        mockTab(props);
        return (<mockTab props={props}>{props.children}</mockTab>)
    })
}