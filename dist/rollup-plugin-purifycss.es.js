import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';

function index (options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{css,sss}'; }

  var filter = createFilter(options.include, options.exclude);

  return {
    name: 'purifycss',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return purify(options.content, code, options.options, options.callback);
    }
  };
}

export default index;
//# sourceMappingURL=rollup-plugin-purifycss.es.js.map
