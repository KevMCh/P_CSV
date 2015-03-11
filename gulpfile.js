var gulp    = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['server']);

// npm install supervisor -g
gulp.task('server', function () {
  return gulp.src('').pipe(shell([ 'node-supervisor app.js' ]));
});

gulp.task('open', function() {
  return gulp.src('').
           pipe(shell("open https://github.com/crguezl/how-jquery-works-tutorial/tree/getallparams"));
});
