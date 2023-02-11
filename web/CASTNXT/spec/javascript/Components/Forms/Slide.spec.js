import Slide from '../../../../app/javascript/components/Forms/Slide'
import { SLIDE_PROPS_MOCK, SLIDE_PROPS_IMAGE } from '../../__mocks__/forms.mock'
import renderer from 'react-test-renderer';

const mockForm = jest.fn()
jest.mock('@rjsf/core', ()=>(props)=>{
    mockForm(props);
    return (<mockForm props={props}>{props.children}</mockForm>)
})

test('Slide Load Test', ()=>{
    const component = renderer.create(
        <Slide
            schema={SLIDE_PROPS_MOCK.schema}
            uiSchema={SLIDE_PROPS_MOCK.uiSchema}
            formData={SLIDE_PROPS_MOCK.formData}
            children={true}
            onFormDataChange={() =>  jest.fn()}
        />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Slide Load Test with Image', ()=>{
    const component = renderer.create(
        <Slide
            schema={SLIDE_PROPS_IMAGE.schema}
            uiSchema={SLIDE_PROPS_IMAGE.uiSchema}
            formData={SLIDE_PROPS_IMAGE.formData}
            children={true}
            onFormDataChange={() =>  jest.fn()}
        />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})