Gulp React Statics Style
========================

gulp wrapper for [`react-statics-styles`](https://github.com/elierotenberg/react-statics-styles).
Its takes components source files which export component definitions, and gives CSS files. You can then pipe it to other processors, such as `gulp-postcss`.

Usage
=====

This module is written in ES6/7. You will need `babel` to run it.

In a component file (eg. `MyComponent.jsx`):
```js
import { styles } from 'react-statics-styles';

@styles({
  '.MyComponent': {
    transform: 'translate(-50%,-50%)',
  },
})
class MyComponent extends React.Component {
  ...
}

export default MyComponent;
```

In your `gulpfile.js`:

```js
var styles = require('gulp-react-statics-styles');

gulp.task('componentsCSS', function() {
  return gulp.src('src/**/*.jsx')
    .pipe(babel())
    .pipe(styles())
  .pipe(gulp.dest('static/'));
});
```

You can combine this with any JS preprocessor or CSS postprocessor, for example if you use `babel` for JS, and `autoprefixer-core` and `csswring` for CSS (via `postcss`):

```js
gulp.src('src/**/*.jsx')
  .pipe(babel())
  .pipe(styles())
  .pipe(postcss([autoprefixer, csswring]))
.pipe(gulp.dest('static/components.css'));
```

In the real world, you probably want to only run your JS source transformation once per build and cache the results, but its up to you to design your gulpfile accordingly :)
