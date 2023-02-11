import React from "react";
import CategoryFilter from "../../../../app/javascript/components/Filter/CategoryFilter";
import renderer from 'react-test-renderer';

test('CategoryFilter Load', () => {
    const component = renderer.create(<CategoryFilter categoryFilterValueSelected={jest.fn()}></CategoryFilter>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
