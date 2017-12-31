# rollup-plugin-purifycss

Seamless integration between Rollup and PurifyCSS.

## Install

```bash
$ npm i rollup-plugin-purifycss -D
# or
$ yarn add rollup-plugin-purifycss -D
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
    purifycss({
      content: ['**/src/**/*.js', '**/src/**/*.html'],
      options: {
        info: true,
        rejected: true
      },
      callback(result) {
        console.log(result);
      }
    })
  ]
};
```
