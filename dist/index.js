"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

require("babel/polyfill");
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

var _gulpUtil = require("gulp-util");

var PluginError = _gulpUtil.PluginError;
var File = _gulpUtil.File;
var replaceExtension = _gulpUtil.replaceExtension;
var join = require("path").join;
var extractStyles = require("react-statics-styles").extractStyles;


var PLUGIN_NAME = "gulp-react-statics-styles";

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
      var moduleName = require.resolve(moduleFile);
      if (require.cache[moduleName] !== void 0) {
        delete require.cache[moduleName];
      }
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
