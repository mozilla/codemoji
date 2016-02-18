var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var del = require('del')
var rev = require('gulp-rev')
var minifyHtml = require('gulp-minify-html');

gulp.task('minify', ['clean'], function() {
  gulp.src('index.html')
      .pipe(usemin({
        css: [ minifyCss(), rev() ],
        js: [ uglify(), rev() ],
        vendorjs: [ uglify(), rev() ],
        html: [ minifyHtml({ empty: true }) ],
      }))
      .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
  return del([
    'public/**/*',
    // don't remove .gitkeep
    '!public/.gitkeep'
  ]);
});

gulp.task('build', ['clean', 'minify']);
