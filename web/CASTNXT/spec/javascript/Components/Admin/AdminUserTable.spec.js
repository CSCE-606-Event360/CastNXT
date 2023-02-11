import AdminUserTable from "../../../../app/javascript/components/Admin/AdminUserTable";
import {propsDefault} from '../../__mocks__/props.mock';
import renderer from 'react-test-renderer';


jest.mock('@material-ui/data-grid',() => ({
    DataGrid: (props) => {
        jest.fn(props);
        return(<mock-data-grid props={props}>{props.children}</mock-data-grid>)
    },
    getGridNumericColumnOperators: () => []
}));
jest.mock('@material-ui/core', () => ({
    Paper: (props) => {
        jest.fn(props)
        return (<mock-paper props={props}>{props.children}</mock-paper>)
    }
}))

jest.mock('../../../../app/javascript/utils/RangeFilter' , () => ({
    extendedNumberOperators: () => []
}))

test('Admin Table Load', () =>{
    const component = renderer.create(
        <AdminUserTable properties = {propsDefault.properties}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})