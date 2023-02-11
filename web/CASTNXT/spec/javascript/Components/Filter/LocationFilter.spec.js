import LocationFilter from "../../../../app/javascript/components/Filter/LocationFilter";
import renderer from 'react-test-renderer';

jest.mock('@mui/material/FormControl', ()=>(props)=>{
    jest.fn(props)
    return(<mock-fc props={props}>{props.children}</mock-fc>)
})

jest.mock('@mui/material/InputLabel', ()=>(props)=>{
    jest.fn(props)
    return(<mock-ip props={props}>{props.children}</mock-ip>)
})

jest.mock('@mui/material/Select', ()=>(props)=>{
    jest.fn(props)
    return(<mock-select props={props}>{props.children}</mock-select>)
})

jest.mock('@mui/material/MenuItem', ()=>(props)=>{
    jest.fn(props)
    return(<mock-menu props={props}>{props.children}</mock-menu>)
})

test('Component Load for LocationFilter', ()=>{
    const component = renderer.create(<LocationFilter handleLocationFilterChange={jest.fn()}></LocationFilter>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})