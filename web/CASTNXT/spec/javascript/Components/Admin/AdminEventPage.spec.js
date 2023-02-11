import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import {ADMIN_EVENT_PROPERTIES} from '../../__mocks__/props.mock';
import {mockBoilerplate} from '../../__mocks__/component.mock';
import AdminEventPage from '../../../../app/javascript/components/Admin/AdminEventPage'

jest.mock("@mui/material/Button", ()=>(props)=>mockBoilerplate(props,"@mui/material/Button"))
jest.mock('@mui/material/Tabs', ()=>(props)=>mockBoilerplate(props,"@mui/material/Tabs"))
jest.mock('@mui/material/Tab', ()=>(props)=>mockBoilerplate(props,"@mui/material/Tab"))
jest.mock("@mui/material/Box", ()=>(props)=>mockBoilerplate(props,"@mui/material/Box"))
jest.mock(`../../../../app/javascript/components/Admin/AdminEventHome`, ()=>(props)=>mockBoilerplate(props,"AdminEventHome"))
jest.mock(`../../../../app/javascript/components/Admin/AdminCreateClientStack`, ()=>(props)=>mockBoilerplate(props,"AdminCreateClientStack"))
jest.mock(`../../../../app/javascript/components/Admin/AdminClientDecks`, ()=>(props)=>mockBoilerplate(props,"AdminClientDecks"))
jest.mock(`../../../../app/javascript/components/Admin/AdminEventSummary`, ()=>(props)=>mockBoilerplate(props,"AdminEventSummary"))
jest.mock(`../../../../app/javascript/components/Admin/AdminFinalizedCandidates`, ()=>(props)=>mockBoilerplate(props,"AdminFinalizedCandidates"))
jest.mock(`../../../../app/javascript/components/Admin/AdminSubmittedDocs`, ()=>(props)=>mockBoilerplate(props,"AdminSubmittedDocs"))
jest.mock('../../../../app/javascript/components/Navbar/Header',()=>(props)=>mockBoilerplate(props,"Header")) 

const originalProperties = global.properties;
afterEach(() => {
    global.properties = originalProperties;
});

test('AdmintEventPage Load', ()=>{
    global.properties = ADMIN_EVENT_PROPERTIES
    const component = renderer.create(
        <AdminEventPage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})