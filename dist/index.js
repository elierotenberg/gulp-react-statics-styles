"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

require("6to5/polyfill");
var _ = require("lodash");
var should = require("should");
var Promise = (global || window).Promise = require("bluebird");
var __DEV__ = process.env.NODE_ENV !== "production";
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === "object";
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}
var through = _interopRequire(require("through2"));

var PluginError = require("gulp-util").PluginError;
var File = require("gulp-util").File;
var replaceExtension = require("gulp-util").replaceExtension;
var join = require("path").join;
var extractStyles = require("react-nexus-style").extractStyles;


var PLUGIN_NAME = "gulp-react-nexus-style";

module.exports = function () {
  return through.obj(function (file, enc, fn) {
    if (file.isNull()) {
      return fn(null, file);
    }
    if (file.isStream()) {
      return fn(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }
    var base = file.base;
    var path = file.path;
    var relative = file.relative;
    try {
      var moduleFile = join(base, relative);
      var Component = require(moduleFile);
      var styles = extractStyles(Component);
      var contents = undefined;
      try {
        contents = new Buffer(styles);
      } catch (err) {
        return fn(null);
      }
      path = replaceExtension(path, ".css");
      this.push(new File({ path: path, contents: contents }));
    } catch (err) {
      return fn(err);
    }
    return fn(null);
  });
};