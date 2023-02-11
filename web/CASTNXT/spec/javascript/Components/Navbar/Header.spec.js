import renderer from 'react-test-renderer';
import Header from '../../../../app/javascript/components/Navbar/Header';
import {propsDefault} from '../../__mocks__/props.mock';

const mockAppBar = jest.fn();
jest.mock('@mui/material/AppBar', ()=>(props)=>{
    mockAppBar(props);
    return (<mock-AppBar props={props}>{props.children}</mock-AppBar>);
})

const originalProperties = global.properties;
Object.defineProperty(window, 'alert', { value: (val) => jest.fn(val)})


beforeEach(() =>{
    global.properties = propsDefault.properties;
})

afterEach(() => {
    global.properties = originalProperties;
});

test('Navbar Load test', ()=>{
    const component = renderer.create(
        <Header />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Log Out test', ()=>{
    const component = renderer.create(
        <Header />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
    renderer.act(() =>{
        component.root.find(el => el.props.id === 'logoutBtn').props.onClick()
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})