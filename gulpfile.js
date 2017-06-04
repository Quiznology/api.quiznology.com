const gulp   = require('gulp');
const gMocha = require('gulp-mocha');
const watch  = require('gulp-watch');

gulp.task('test', testSingle);
gulp.task('watch-test', testWatch);

function testSingle() {
  gulp.src('lib/**/*.test.js', {read: false})
		  .pipe(gMocha());
}

function testWatch() {
    gulp.watch(['**/*.js'], ['test']);
};
