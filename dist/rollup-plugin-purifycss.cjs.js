'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var purify = _interopDefault(require('purify-css'));

function index (options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{css,sss}'; }

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

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
        return {
          code: ("export default " + (JSON.stringify(purifiedCSS))),
          map: { mappings: '' },
        };
      });
    },
  };
}

module.exports = index;
