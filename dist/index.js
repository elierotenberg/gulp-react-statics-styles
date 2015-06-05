'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _gulpUtil = require('gulp-util');

var _path = require('path');

var _reactStaticsStyles = require('react-statics-styles');

var _ = require('lodash');
var should = require('should');
var Promise = (global || window).Promise = require('bluebird');
var __DEV__ = process.env.NODE_ENV !== 'production';
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === 'object';
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}

var PLUGIN_NAME = 'gulp-react-statics-styles';

function processFile(_ref, fn) {
  var base = _ref.base;
  var path = _ref.path;
  var relative = _ref.relative;

  try {
    var moduleFile = (0, _path.join)(base, relative);
    var moduleName = require.resolve(moduleFile);
    if (require.cache[moduleName] !== void 0) {
      delete require.cache[moduleName];
    }
    var Component = require(moduleFile);
    var styles = (0, _reactStaticsStyles.extractStyles)(Component);
    var contents = undefined;
    try {
      contents = new Buffer(styles);
    } catch (err) {
      return fn(null);
    }
    this.push(new _gulpUtil.File({ path: (0, _gulpUtil.replaceExtension)(path, '.css'), contents: contents }));
  } catch (err) {
    return fn(err);
  }
  return fn(null);
}

exports['default'] = function () {
  return _through22['default'].obj(function enqueueFile(file, enc, fn) {
    void enc;
    if (file.isNull()) {
      return fn(null, file);
    }
    if (file.isStream()) {
      return fn(new _gulpUtil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    return processFile.call(this, file, fn);
  });
};

module.exports = exports['default'];