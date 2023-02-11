import renderer from 'react-test-renderer';
import ClientEventSummary from '../../../../app/javascript/components/Client/ClientEventSummary';
import {propsDefault, PROPERTIES_CLIENT_SUMMARY} from '../../__mocks__/props.mock';

const mockAppBar = jest.fn();
jest.mock('../../../../app/javascript/components/Navbar/Header')
jest.mock('@mui/material/Paper')
jest.mock('@mui/material/TableContainer', ()=>(props)=>{
    mockAppBar(props);
    return (<mock-table-container props={props}>{props.children}</mock-table-container>);
})

//const originalProperties = global.properties;
Object.defineProperty(window, 'alert', { value: (val) => jest.fn(val)})

/*
afterEach(() => {
    global.properties = originalProperties;
});*/

test('Client Summary Page Table', ()=>{
    //global.properties = PROPERTIES_CLIENT_SUMMARY;
    const component = renderer.create(
        <ClientEventSummary properties = {PROPERTIES_CLIENT_SUMMARY}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})