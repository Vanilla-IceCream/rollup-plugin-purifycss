import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';

var index = function(options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{css,sss}'; }

  var filter = createFilter(options.include, options.exclude);

  return {
    name: 'purifycss',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return purify(code, '', {});
    }
  };
};

export default index;
//# sourceMappingURL=rollup-plugin-purifycss.es.js.map