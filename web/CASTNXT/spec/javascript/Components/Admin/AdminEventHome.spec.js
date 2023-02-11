import AdminEventHome from "../../../../app/javascript/components/Admin/AdminEventHome";
import renderer from 'react-test-renderer';
import { propsDefault, ROW_CURATED, ROWDATA_MOCKED } from '../../__mocks__/props.mock';
import axios from 'axios';

const mockToggleButtonGroup = jest.fn();
jest.mock('axios');

const mockedAxios = axios;

jest.mock('.../../../../app/javascript/components/Navbar/Header.js')
jest.mock('@mui/material/ToggleButtonGroup', ()=>(props)=>{
    mockToggleButtonGroup(props);
    return (<mock-ToggleButtonGroup props={props}>{props.children}</mock-ToggleButtonGroup>);
})


test('AdminEventHome Load test', ()=>{
    const component = renderer.create(
        <AdminEventHome properties={propsDefault.properties} />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('AdminEventHome OnChange: Success', () =>{
    const component = renderer.create(
        <AdminEventHome properties={propsDefault.properties} />
    )
    let tree = component.toJSON();
    global.window = Object.create(window);
    global.confirm = () => true
    const url = "http://dummy.com";
    Object.defineProperty(window, 'location', {value: {href: url}});
    
    const e = {
        target: {
            value: 'Value'
        }
    }
    
    mockedAxios.put.mockResolvedValue({
        data:{
            comment: 'Hola!'
        },
        response: {
                
        }
    })
    
    renderer.act(() =>{
        component.root.find(el => el.props.id === 'ToggleButtonGroup').props.onChange(e)
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('AdminEventHome OnChange: Failure', () =>{
    const component = renderer.create(
        <AdminEventHome properties={propsDefault.properties} />
    )
    let tree = component.toJSON();
    global.window = Object.create(window);
    global.confirm = () => true
    const url = "http://dummy.com";
    Object.defineProperty(window, 'location', {value: {href: url}});
    
    const e = {
        target: {
            value: 'Value'
        }
    }
    
    mockedAxios.put.mockRejectedValueOnce({
        response: {
            status: 403,
            data:{
                comment: 'Hola!',
                redirect_path: '/path'
            },
        }
    })
    
    renderer.act(() =>{
        component.root.find(el => el.props.id === 'ToggleButtonGroup').props.onChange(e)
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})