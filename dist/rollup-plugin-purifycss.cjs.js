'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var purify = _interopDefault(require('purify-css'));

var index = function(options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{css,sss}'; }

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  return {
    name: 'purifycss',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return purify(code, '', {});
    }
  };
};

module.exports = index;
//# sourceMappingURL=rollup-plugin-purifycss.cjs.js.map
