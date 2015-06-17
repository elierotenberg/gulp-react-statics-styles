Gulp React Statics Style
========================

gulp wrapper for [`react-statics-styles`](https://github.com/elierotenberg/react-statics-styles).
Its takes components source files which export component definitions, and gives CSS files. You can then pipe it to other processors, such as `gulp-postcss`.

Usage
=====

<<<<<<< HEAD
This module is written in ES6/7. You will need `babel` to run it.
=======
1. Fork or clone this repository.
2. (Optional) Edit `package.json` if you intent to publish your package on `npm`.
3. `npm install` to install all the required dependencies from `npm`.
4. Hack `src/index.jsx` and `src/__tests__/index.jsx`.
5. Lint/test using `gulp`.
6. Don't forget to edit this `README.md` file.
>>>>>>> starterkit/master

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

<<<<<<< HEAD
export default MyComponent;
```
=======
- Sanely configured `gulpfile.js`, `package.json`, `.gitignore`, `.editorconfig`, `.eslintrc`, `.jsbeautifyrc`.
- Both CommonJS and ES6 modules are supported.
- Linting and testing is pre-configured.
- `lodash`, `bluebird` and `should` are included by default.
>>>>>>> starterkit/master

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
