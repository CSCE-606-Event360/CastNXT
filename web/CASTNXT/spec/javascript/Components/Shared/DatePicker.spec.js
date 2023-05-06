import DatePickerWrapper from "../../../../app/javascript/components/Shared/DatePicker";
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import DatePickerWrapperStart from "../../../../app/javascript/components/Shared/DatePickerStart";
import DatePickerWrapperEnd from "../../../../app/javascript/components/Shared/DatePickerEnd";

jest.mock('@mui/material/TextField', () => (props) => {
    jest.fn(props);
    return (<mockTextField props={props}>{props.children}</mockTextField>)
})

jest.mock('@mui/x-date-pickers/LocalizationProvider', () =>({
    LocalizationProvider: (props) => {
        jest.fn(props)
        return (<Mock-LocalizationProvider props={props}>{props.children}</Mock-LocalizationProvider>)
    } 
}))

jest.mock('@mui/x-date-pickers/DatePicker', () =>({
    DatePicker: (props) => {
        jest.fn(props)
        return (<Mock-DatePicker props={props}>{props.children}</Mock-DatePicker>)
    } 
}))

const onChange = jest.fn()
test('DatePicker Load Test', ()=>{
    const component = renderer.create(
        <DatePickerWrapper value={''} onChange={onChange} />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('DatePicker Load Test', ()=>{
    const component = renderer.create(
        <DatePickerWrapper value={''} onChange={onChange} />
    )
    
    const view = ReactTestUtils.renderIntoDocument(<DatePickerWrapper value={'2022-12-08T19:35:27Z'} onChange={onChange}/>);
    view.onChange('2022-12-08T19:35:27Z')
})
/*
<DatePickerWrapperStart id='eventdateStart' name='eventdateStart' variant='outlined' onChange={this.handleChange} value={this.state.eventdateStart} style={commonStyle} />
<DatePickerWrapperEnd id='eventdateEnd' name='eventdateEnd' variant='outlined' onChange={this.handleChange} value={this.state.eventdateEnd} style={commonStyle} />*/
test('DatePickerStart Load Test', ()=> {
    const view = ReactTestUtils.renderIntoDocument(<DatePickerWrapperStart 
        id='eventdateStart' 
        name='eventdateStart' 
        variant='outlined' 
        onChange={onChange} 
        value={'2022-12-08T19:35:27Z'} />);
    view.onChange('2022-12-08T19:35:27Z')
})

test('DatePickerEnd Load Test', ()=> {
    const view = ReactTestUtils.renderIntoDocument(<DatePickerWrapperEnd 
        id='eventdateStart' 
        name='eventdateStart' 
        variant='outlined' 
        onChange={onChange} 
        value={'2022-12-08T19:35:27Z'} />);
    view.onChange('2022-12-08T19:35:27Z')
})