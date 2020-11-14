import * as renderer from 'react-test-renderer';
import Table from '.';
import React from 'react';

describe('Table tests:', () => {
    it('Table renders', () => {
        const table = renderer.create(
            <Table
                headers={[{ label: 'ID', key: 'id' }]}
                inputData={[{ id: 2 }, { id: 1 }]}
            />
        );
        const instance = table.root;
        expect(instance.props.sortable).toBe(undefined);
        expect(instance.props.rowSelect).toBe(undefined);
        expect(instance.props.headers).toStrictEqual([
            { label: 'ID', key: 'id' }
        ]);
        expect(instance.props.inputData).toStrictEqual([
            { UNIQUE_ID: 0, id: 2 },
            { UNIQUE_ID: 1, id: 1 }
        ]);
        expect(table.toJSON()).toMatchSnapshot();
    });
});
