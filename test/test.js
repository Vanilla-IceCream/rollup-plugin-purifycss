import { rollup } from 'rollup';

import purifycss from '../src';

process.chdir(__dirname);

describe('rollup-plugin-purifycss', () => {
  it('should handle', async () => {
    const { generate } = await rollup({
      input: './fixtures/basic/main.js',
      plugins: [
        purifycss({
          content: ['./fixtures/basic/main.js', './fixtures/basic/index.html'],
          options: {
            info: true,
          },
        }),
      ],
    });

    const res = await generate({ format: 'iife', name: 'purifycss' });

    expect(res.output[0].code).toMatchSnapshot();
  });
});
