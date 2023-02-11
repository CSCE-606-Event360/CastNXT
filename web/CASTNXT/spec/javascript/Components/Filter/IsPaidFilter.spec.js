import renderer from 'react-test-renderer';
import IsPaidFilter from "../../../../app/javascript/components/Filter/IsPaidFilter";

test('isPaidFilter Load', () => {
    const component = renderer.create(<IsPaidFilter onPaidFilterChanged={jest.fn()}></IsPaidFilter>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
