"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var through = require("through2");
var gutil = require("gulp-util");
var _ref = require("react-nexus-style");

var extractStyles = _ref.extractStyles;
var PluginError = gutil.PluginError;
var File = gutil.File;


var PLUGIN_NAME = "gulp-react-nexus-style";

function vrequire(file, paths) {
  var contents = file.contents;
  var path = file.path;
  var Module = module.constructor;
  var m = new Module();
  m.paths = paths;
  m._compile(contents.toString(), path);
  return m.exports;
}

module.exports = function (mod) {
  var _ref2 = mod || module;
  var paths = _ref2.paths;


  return through.obj(function (file, enc, fn) {
    if (file.isNull()) {
      return fn(null, file);
    }
    if (file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }
    var path = file.path;
    try {
      var Component = vrequire(file, paths);
      var styles = extractStyles(Component);
      var contents;
      try {
        contents = new Buffer(styles);
      } catch (err) {
        return fn(null);
      }
      path = gutil.replaceExtension(path, ".css");
      this.push(new File({ path: path, contents: contents }));
    } catch (err) {
      return fn(err);
    }
    return fn(null);
  });
};