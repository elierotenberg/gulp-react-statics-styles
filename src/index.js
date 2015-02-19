import through from 'through2';
import { PluginError, File, replaceExtension } from 'gulp-util';
import { join } from 'path';
import { extractStyles } from 'react-statics-styles';

const PLUGIN_NAME = 'gulp-react-statics-styles';

module.exports = function() {
  return through.obj(function(file, enc, fn) {
    if(file.isNull()) {
      return fn(null, file);
    }
    if(file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    let { base, path, relative } = file;
    try {
      const moduleFile = join(base, relative);
      const moduleName = require.resolve(moduleFile);
      if(require.cache[moduleName] !== void 0) {
        delete require.cache[moduleName];
      }
      const Component = require(moduleFile);
      const styles = extractStyles(Component);
      let contents;
      try {
        contents = new Buffer(styles);
      }
      catch(err) {
        return fn(null);
      }
      path = replaceExtension(path, '.css');
      this.push(new File({ path, contents }));
    }
    catch(err) {
      return fn(err);
    }
    return fn(null);
  });
};
