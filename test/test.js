import { join } from 'path';
import { rollup } from 'rollup';
import postcss from 'rollup-plugin-postcss';

import purifycss from '../src';

process.chdir(__dirname);

describe('rollup-plugin-purifycss', () => {
  it('should handle', async () => {
    const { generate } = await rollup({
      input: 'fixtures/basic/main.js',
      plugins: [
        postcss(),
        purifycss({
          content: ['fixtures/basic/main.js', 'fixtures/basic/index.html'],
          options: {
            info: true,
            rejected: true
          },
          callback(result) {
            console.log(result);
          }
        })
      ]
    });
    const { code } = await generate({ format: 'iife', name: 'purifycss' });

    expect(code).toBeDefined();
  });
});
