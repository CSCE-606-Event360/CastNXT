import ClientEventFeedback from "../../../../app/javascript/components/Client/ClientEventFeedback";
import renderer from 'react-test-renderer';
import {PROPERTIES_CLIENT_FEEDBACK} from '../../__mocks__/props.mock';
import {mockBoilerplate} from '../../__mocks__/component.mock'
import ReactTestUtils from 'react-dom/test-utils';

const mockTabs = jest.fn();

jest.mock('@mui/material/Table', ()=>(props) =>mockBoilerplate(props, '@mui/material/Table'));
jest.mock('@mui/material/TableCell', ()=>(props)=>mockBoilerplate(props, '@mui/material/TableCell'));
jest.mock('@mui/material/TableContainer', ()=>(props)=>mockBoilerplate(props,'@mui/material/TableContainer'));
jest.mock('@mui/material/TableRow', ()=>(props)=>mockBoilerplate(props,'@mui/material/TableRow'));
jest.mock('@mui/material/TableFooter', ()=>(props)=>mockBoilerplate(props, '@mui/material/TableFooter'));
jest.mock("@mui/material/Paper", ()=>(props)=>mockBoilerplate(props, "@mui/material/Paper"));
jest.mock("@mui/material/TablePagination", ()=>(props)=>mockBoilerplate(props, "@mui/material/TablePagination"));
jest.mock("@mui/material/Button", ()=>(props)=>mockBoilerplate(props,"@mui/material/Button"));
jest.mock("@mui/material/TextField", ()=>(props)=>mockBoilerplate(props, "@mui/material/TextField"));

jest.mock('@mui/material/Tabs', () => (props) =>{
    mockTabs(props);
    return (<mock-Tabs props={props}>{props.children}</mock-Tabs>)
})
const mockTab = jest.fn();
jest.mock('@mui/material/Tab', () => (props) =>{
    mockTab(props);
    return (<mock-Tab props={props}>{props.children}</mock-Tab>)
})

const mockTableBody = jest.fn()
jest.mock('@mui/material/TableBody', () => (props) =>{
    mockTableBody(props);
    return (<mockTableBody props={props}>{props.children}</mockTableBody>)
})
jest.mock('../../../../app/javascript/components/Forms/Slide', () => (props)=>{
    jest.fn(props)
    return (<mock-slide props={props}>{props.children}</mock-slide>)
})

const e = {
    target: {
        name: 'name',
        value:'value'
    }
}

test('ClientEventFeedback Load', ()=>{
    const component = renderer.create(<ClientEventFeedback properties={PROPERTIES_CLIENT_FEEDBACK}/>)

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('ClientEventFeedback ', ()=>{
    const view = ReactTestUtils.renderIntoDocument(<ClientEventFeedback properties={PROPERTIES_CLIENT_FEEDBACK}/>);
    view.handleFeedbackChange(e)
    view.handleChangeRowsPerPage(e)
    view.handleChange(e)
    view.handleChangePage(e, 1)
})