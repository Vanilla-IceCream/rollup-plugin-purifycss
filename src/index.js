import { createFilter } from 'rollup-pluginutils';
import purify from 'purify-css';

export default function(options = {}) {
  if (!options.include) options.include = '**/*.{css,sss}';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'purifycss',
    transform(code, id) {
      if (!filter(id)) return;

      return purify(options.content, code, options.options, options.callback);
    }
  };
}
