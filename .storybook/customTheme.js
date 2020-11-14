import { create } from '@storybook/theming/create';
export default create({
    base: 'light',

    colorPrimary: '#001A70',
    colorSecondary: '#0038C9',

    // UI
    appBg: '#F2F2F2',
    appContentBg: 'white',
    appBorderColor: 'rgba(0, 55, 201, 0.4)',
    appBorderRadius: 10,

    // Toolbar default and active colors
    barTextColor: 'rgba(0, 55, 201, 0.35)',
    barSelectedColor: '#001A70',
    barBg: '#F2F2F2',

    // Form colors
    inputBorder: '#001A70',
    inputTextColor: '#001A70',

    brandTitle: 'LibraryUI Component Library'
});
