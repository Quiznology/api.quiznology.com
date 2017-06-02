const gulp  = require('gulp');
const gMocha = require('gulp-mocha');

gulp.task('test', travis);

function travis() {
  gulp.src('lib/**/*.test.js', {read: false})
		  .pipe(gMocha());
}
