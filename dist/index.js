"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var through = require("through2");
var gutil = require("gulp-util");
var _ref = require("react-nexus-style");

var extractStyles = _ref.extractStyles;
var PluginError = gutil.PluginError;
var File = gutil.File;
var vrequire = require("vinyl-require");

var PLUGIN_NAME = "gulp-react-nexus-style";

module.exports = function (cachebust) {
  if (cachebust === undefined) cachebust = [];
  cachebust.forEach(function (module) {
    var r = require.resolve(module);
    if (require.cache[r]) {
      delete require.cache[r];
    }
  });

  return through.obj(function (file, enc, fn) {
    if (file.isNull()) {
      return fn(null, file);
    }
    if (file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }
    var path = file.path;
    try {
      var Component = vrequire(file);
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