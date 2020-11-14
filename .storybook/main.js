const { merge } = require('webpack-merge');

const maxAssetSize = 244 * 1024;

module.exports = {
    stories: [
        '../stories/GetStarted.stories.mdx', //Default page
        '../stories/*.stories.@(js|jsx|ts|tsx|mdx)',
        '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        '@storybook/addon-jest',
        'storybook-css-modules-preset'
    ],
    webpackFinal: (config) => {
        return merge(config, {
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30 * 1024,
                    maxSize: maxAssetSize
                }
            },
            performance: {
                maxAssetSize: maxAssetSize
            }
        });
    }
};
