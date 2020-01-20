import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';
import styleInject from 'style-inject';

function index (options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{css,sss}'; }

  var filter = createFilter(options.include, options.exclude);
  var styles = [];

  return {
    name: 'purifycss',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      var purifyPromise = function (_content, _code, _options) {
        return new Promise(function (resolve) {
          purify(_content, _code, _options, function (purifiedCSS) {
            resolve(purifiedCSS);
          });
        });
      };

      return purifyPromise(options.content, code, options.options).then(function (purifiedCSS) {
        styles.push(purifiedCSS);

        return {
          code: ("export default " + (JSON.stringify(purifiedCSS))),
          map: { mappings: '' },
        };
      });
    },
    generateBundle: function generateBundle(options, bundle) {
      var code = styles.join('');

      for (var name in bundle) {
        bundle[name].code +=
          '\n' +
          styleInject.toString() +
          ';\nstyleInject("' +
          code.replace(/\n/g, '').replace(/"/g, '\\"') +
          '");';
      }
    },
  };
}

export default index;
