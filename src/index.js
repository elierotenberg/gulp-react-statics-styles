const through = require('through2');
const gutil = require('gulp-util');
const { extractStyles } = require('react-nexus-style');
const { PluginError, File } = gutil;

const PLUGIN_NAME = 'gulp-react-nexus-style';

module.exports = function(cachebust = []) {
  cachebust.forEach((module) => {
    const r = require.resolve(module);
    if(require.cache[r]) {
      delete require.cache[r];
    }
  });

  return through.obj(function(file, enc, fn) {
    if(file.isNull()) {
      return fn(null, file);
    }
    if(file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    let { path } = file;
    try {
      const r = require.resolve(path);
      if(require.cache[r]) {
        delete require.cache[r];
      }
      const Component = require(path);
      const styles = extractStyles(Component);
      let contents;
      try {
        contents = new Buffer(styles);
      }
      catch(err) {
        return;
      }
      path = gutil.replaceExtension(path, '.css');
      this.push(new File({ path, contents }));
    }
    catch(err) {
      return fn(err);
    }
    return fn(null);
  });
};
