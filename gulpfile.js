var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function(){
  return gulp.src('src/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});
