gulp React Nexus Style
======================

gulp wrapper for [`react-nexus-style`](https://github.com/elierotenberg/react-nexus-style).
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
var style = require('react-nexus-style');
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
.pipe(require('react-nexus-style')())
.pipe(require('gulp-contact')())
.pipe(require('gulp-postcss')([require('autoprefixer-core'), require('csswring')]))
.pipe(gulp.dest('static/components.css'));
```

In the real world, you probably want to only run your JS source transformation once per build and cache the results, but its up to you to design your gulpfile accordingly :)
