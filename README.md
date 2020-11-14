# React Component Library Template

This is a template for building a React component library using Typescript.

It also supports docs via [Storybook](https://storybook.js.org/) and custom styling for components with css-modules.

Created using [TSDX](https://tsdx.io/)

## Install

```bash
npm install <package-name>
```

## Usage

```tsx
import React, { Component } from 'react';

import { MyComponent } from 'libraryui';

class Example extends Component {
    render() {
        return <MyComponent />;
    }
}
```

## Adding new components to library

1. Add components to components folder
2. Add import & re-export to index.tsx
3. npm run build

## How to export library and use

1. npm pack
2. npm install /path/to/<package-name>.tgz

## Adding docs

1. Make sure test/.jestResults.json exists
2. Create a _.stories.mdx or _.stories.tsx file to component folder, docs may or may not include components
3. Add tests for component if necessary to component folder
4. npm run storybook

## Exporting docs

1. Make sure test/.jestResults.json exists
2. npm run build-storybook
