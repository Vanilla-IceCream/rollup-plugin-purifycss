# rollup-plugin-purifycss

Tree-shaking JavaScript and CSS with Rollup.

## Install

```bash
$ npm i rollup-plugin-purifycss -D
```

## Usage

```js
import { join } from 'path';
import postcss from 'rollup-plugin-postcss';
import purifycss from 'rollup-plugin-purifycss';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    postcss(),
    purifycss()
  ]
};
```
