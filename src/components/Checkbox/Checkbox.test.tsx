import * as renderer from 'react-test-renderer';
import Checkbox from '.';
import React from 'react';

describe('Checkbox tests:', () => {
    it('Checkbox renders', () => {
        const element = <Checkbox indeterminate={true} />;
        const checkbox = renderer.create(element);
        const instance = checkbox.root;
        expect(instance.props.checked).toBe(undefined);
        expect(instance.props.indeterminate).toBe(true);
        expect(instance.children).toHaveLength(2);
        expect(checkbox.toJSON()).toMatchSnapshot();
    });
    it('Checkbox onChange works', () => {
        const mockFunction = jest.fn();
        const element = <Checkbox onChange={mockFunction} />;
        const checkbox = renderer.create(element);
        expect(checkbox.toJSON()).toMatchSnapshot();
        const instance = checkbox.root;
        renderer.act(() => {
            instance.props.onChange();
        });
        expect(mockFunction).toHaveBeenCalledTimes(1);
    });
});
