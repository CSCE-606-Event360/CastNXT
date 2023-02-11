import ClientEventPage from "../../../../app/javascript/components/Client/ClientEventPage";
import renderer from 'react-test-renderer';
import {mockBoilerplate} from '../../__mocks__/component.mock'
import {PROPERTIES_CLIENT_FEEDBACK} from '../../__mocks__/props.mock';
import ReactTestUtils from 'react-dom/test-utils';

jest.mock("@mui/material/Button", ()=>(props)=>mockBoilerplate(props,"@mui/material/Button"))
jest.mock('@mui/material/Tabs', ()=>(props)=>mockBoilerplate(props,"@mui/material/Tabs"))
jest.mock('@mui/material/Tab', ()=>(props)=>mockBoilerplate(props,"@mui/material/Tab"))
jest.mock("@mui/material/Box", ()=>(props)=>mockBoilerplate(props,"@mui/material/Box"))
jest.mock("../../../../app/javascript/components/Client/ClientEventFeedback", ()=>(props)=>mockBoilerplate(props,"ClientEventFeedback"))
jest.mock("../../../../app/javascript/components/Client/ClientEventSummary", ()=>(props)=>mockBoilerplate(props,"ClientEventSummary"))

const originalProperties = global.properties;

beforeEach(() =>{
    global.properties = PROPERTIES_CLIENT_FEEDBACK;
})

afterEach(() => {
    global.properties = originalProperties;
});
Object.defineProperty(window, 'location', {value: {href: 'url'}});

const e = {
    target: {
        name: 'name',
        value:'value'
    }
}

test('ClientEventPage Load',()=>{
    const component = renderer.create(<ClientEventPage />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('ClientEventPage HandlTabChange',()=>{
    const view = ReactTestUtils.renderIntoDocument(<ClientEventPage />);

    view.handleTabChange(e, 0);
})

test('ClientEventPage back',()=>{
    const view = ReactTestUtils.renderIntoDocument(<ClientEventPage />);

    view.back(e, 0);
})
