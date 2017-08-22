import { join } from 'path';
import postcss from 'rollup-plugin-postcss';

const purifycss = require('../');

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    postcss(),
    purifycss()
  ]
};
