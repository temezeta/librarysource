import { withTests } from '@storybook/addon-jest';
import results from '../test/.jestResults.json';
import React from 'react';

export const parameters = {
    actions: { argTypesRegex: '^on.*' },
    controls: { expanded: true },
    previewTabs: { 'storybook/docs/panel': { index: -1 } },
    viewMode: 'docs',
    options: { panelPosition: 'right' },
    layout: 'centered'
};

export const decorators = [
    withTests({ results }),
    (Story) => (
        <div
            style={{
                display: 'flex',
                placeContent: 'center'
            }}
        >
            <Story />
        </div>
    )
];
