const through = require('through2');
const gutil = require('gulp-util');
const { join } = require('path');
const { extractStyles } = require('react-nexus-style');
const { PluginError, File } = gutil;

const PLUGIN_NAME = 'gulp-react-nexus-style';

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
      const Component = require(moduleFile);
      const styles = extractStyles(Component);
      let contents;
      try {
        contents = new Buffer(styles);
      }
      catch(err) {
        return fn(null);
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
