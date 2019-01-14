var gulp = require("gulp");

gulp.task('jsonConfig', function () {
  return gulp.src('./src/config/*.json')
    .pipe(gulp.dest('./build/src/config'));
});

gulp.task('templatesPUG', function () {
  return gulp.src('./src/templates/*.pug')
    .pipe(gulp.dest('./build/src/templates'));
});

gulp.task('default', gulp.parallel('jsonConfig', 'templatesPUG'));