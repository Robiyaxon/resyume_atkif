const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const scssPath = '_scss/*.scss';
const destPath = '_site/css';

gulp.task('sass', function () {
  return gulp
    .src(scssPath)
    .pipe(sass({
      includePaths: ['scss'],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(prefix({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(destPath))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(scssPath, gulp.series('sass'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('sass'));

gulp.task('default', gulp.series('serve'));