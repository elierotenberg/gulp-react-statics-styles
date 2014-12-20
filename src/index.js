const through = require('through2');
const gutil = require('gulp-util');
const { extractStyles } = require('react-nexus-style');
const { PluginError, File } = gutil;

const PLUGIN_NAME = 'gulp-react-nexus-style';

function vrequire(file, paths) {
  const { contents, path } = file;
  let Module = module.constructor;
  const m = new Module();
  m.paths = paths;
  m._compile(contents.toString(), path);
  return m.exports;
}

module.exports = function(mod) {
  const { paths } = mod || module;

  return through.obj(function(file, enc, fn) {
    if(file.isNull()) {
      return fn(null, file);
    }
    if(file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    let { path } = file;
    try {
      const Component = vrequire(file, paths);
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
