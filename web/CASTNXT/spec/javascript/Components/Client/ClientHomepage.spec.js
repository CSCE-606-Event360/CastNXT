import renderer from 'react-test-renderer';
import Header from '../../../../app/javascript/components/Navbar/Header';
import ClientHomepage from '../../../../app/javascript/components/Client/ClientHomepage';
import {propsDefault, PROPERTIES_CLIENT_EMPTY, PROPERTIES_CLIENT_NONEMPTY} from '../../__mocks__/props.mock';

const mockAppBar = jest.fn();
jest.mock('@mui/material/TableContainer', ()=>(props)=>{
    mockAppBar(props);
    return (<mock-AppBar props={props}>{props.children}</mock-AppBar>);
})

const originalProperties = global.properties;
Object.defineProperty(window, 'alert', { value: (val) => jest.fn(val)})

afterEach(() => {
    global.properties = originalProperties;
});

test('Client Home Page Empty Table', ()=>{
    global.properties = PROPERTIES_CLIENT_EMPTY;
    const component = renderer.create(
        <ClientHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Client Home Page NonEmpty Table', ()=>{
    global.properties = PROPERTIES_CLIENT_NONEMPTY;
    const component = renderer.create(
        <ClientHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
