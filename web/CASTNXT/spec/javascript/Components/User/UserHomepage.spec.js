import UserHomepage from "../../../../app/javascript/components/User/UserHomepage";
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { USER_PROPERTIES_WITH_SUBMISSIONS, USER_PROPERTIES_WITH_ACCEPTING } from '../../__mocks__/props.mock'

const mockHeader = jest.fn()
const originalProperties = global.properties;
jest.mock('../../../../app/javascript/components/Navbar/Header', ()=>(props)=>{
    mockHeader(props);
    return(<mock-header />)
})
const mockTabs = jest.fn();
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

beforeEach(() =>{
    global.properties = USER_PROPERTIES_WITH_SUBMISSIONS;
})

afterEach(() => {
    global.properties = originalProperties;
});

test('User Home Page Load With Filled Data', ()=>{
    const component = renderer.create(
        <UserHomepage />
    )
    //component.renderSubmittedEventList()
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const view = ReactTestUtils.renderIntoDocument(<UserHomepage />);
    view.renderSubmittedEventList()
})

test('User Home Page Load With Aceepting Event Status', ()=>{
    global.properties = USER_PROPERTIES_WITH_ACCEPTING;
    const component = renderer.create(
        <UserHomepage />
    )
    //component.renderSubmittedEventList()
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const view = ReactTestUtils.renderIntoDocument(<UserHomepage />);
    view.renderSubmittedEventList()
})