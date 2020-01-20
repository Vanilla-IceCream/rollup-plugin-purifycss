import { join } from 'path';

const purifycss = require('../');

export default {
  input: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    purifycss({
      content: ['**/*.js', '**/*.html'],
      options: {
        info: true,
      },
    }),
  ],
};
