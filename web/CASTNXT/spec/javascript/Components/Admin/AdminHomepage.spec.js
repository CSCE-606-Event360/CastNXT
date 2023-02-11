import AdminHomepage from "../../../../app/javascript/components/Admin/AdminHomepage";
import renderer from 'react-test-renderer';
import { ADMIN_PROPERTIES_EVENT_NONE, ADMIN_PROPERTIES_EVENT_ACCEPTING, ADMIN_PROPERTIES_EVENT_DELETED } from '../../__mocks__/props.mock';

const mockTableContainer = jest.fn();
const mockButton = jest.fn();
const mockHeader = jest.fn()
const originalProperties = global.properties;


jest.mock('.../../../../app/javascript/components/Navbar/Header.js', () => (props) =>{
    mockHeader(props);
    return (<mock-header props={props}> props.children</mock-header>)
})
jest.mock('@mui/material/Paper')
jest.mock('@mui/material/TableContainer', ()=>(props)=>{
    mockTableContainer(props);
    return (<mock-TableContainer props={props}>{props.children}</mock-TableContainer>);
})

jest.mock('.../../../../app/javascript/components/Navbar/Header.js')
jest.mock('@mui/material/Button', ()=>(props)=>{
    mockButton(props);
    return (<mock-Button props={props}>{props.children}</mock-Button>);
})

afterEach(() => {
    global.properties = originalProperties;
});

test('AdminHomepage Load test', ()=>{
    global.properties = ADMIN_PROPERTIES_EVENT_ACCEPTING;
    const component = renderer.create(
        <AdminHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('AdminHomepage Load test: DELETED event', ()=>{
    global.properties = ADMIN_PROPERTIES_EVENT_DELETED
    const component = renderer.create(
        <AdminHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('AdminHomepage Load test: NO events', ()=>{
    global.properties = ADMIN_PROPERTIES_EVENT_NONE
    const component = renderer.create(
        <AdminHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

