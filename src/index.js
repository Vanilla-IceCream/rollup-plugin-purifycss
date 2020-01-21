import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';
import styleInject from 'style-inject';

export default (options = {}) => {
  if (!options.include) options.include = '**/*.{css,sss}';

  const filter = createFilter(options.include, options.exclude);
  const styles = [];

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
        styles.push(purifiedCSS);

        return {
          code: `export default ${JSON.stringify(purifiedCSS)}`,
          map: { mappings: '' },
        };
      });
    },
    generateBundle(options, bundle) {
      const code = styles.join('');

      for (const name in bundle) {
        bundle[name].code +=
          '\n' +
          styleInject.toString() +
          ';\nstyleInject("' +
          code.replace(/\n/g, '').replace(/"/g, '\\"') +
          '");';
      }
    },
  };
};
