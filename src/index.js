import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';

export default (options = {}) => {
  if (!options.include) options.include = '**/*.{css,sss}';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'purifycss',
    transform(code, id) {
      if (!filter(id)) return;

      const purifyPromise = (_content, _code, _options) => {
        return new Promise(resolve => {
          purify(_content, _code, _options, purifiedCSS => {
            resolve(purifiedCSS);
          });
        });
      };

      return purifyPromise(options.content, code, options.options).then(purifiedCSS => {
        return {
          code: `export default ${JSON.stringify(purifiedCSS)}`,
          map: { mappings: '' },
        };
      });
    },
  };
};
