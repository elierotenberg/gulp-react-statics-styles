Gulp React Statics Style
========================

gulp wrapper for [`react-statics-styles`](https://github.com/elierotenberg/react-statics-styles).
Its takes components source files which export component definitions, and gives CSS files.

Usage
=====

In a component file (eg. `MyComponent.jsx`):
```js
var MyComponent = React.createClass({
  statics: {
    styles: {
        ...
      }
    }
  ...
});
module.exports = MyComponent;
```

In your `gulpfile.js`:

```js
var style = require('gulp-react-statics-styles');
var react = require('gulp-react');

gulp.task('componentsCSS', function() {
  return gulp.src('src/**/*.jsx')
    .pipe(react())
    .pipe(style())
  .pipe(gulp.dest('static/'));
});
```

You can combine this with any JS preprocessor or CSS postprocessor, for example if you use `6to5` for JS, and `autoprefixer-core` and `csswring` for CSS (via `postcss`):

```js
gulp.src('src/**/*.jsx')
.pipe(require('gulp-react')())
.pipe(require('gulp-6to5')({ runtime: true }))
.pipe(require('gulp-react-statics-styles')())
.pipe(require('gulp-contact')())
.pipe(require('gulp-postcss')([require('autoprefixer-core'), require('csswring')]))
.pipe(gulp.dest('static/components.css'));
```

In the real world, you probably want to only run your JS source transformation once per build and cache the results, but its up to you to design your gulpfile accordingly :)
