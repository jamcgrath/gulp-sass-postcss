var gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  lost = require('lost'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssfixes = require('postcss-fixes'),
  mqpack = require('css-mqpacker'),
  emquery = require('postcss-em-media-query');

gulp.task('sass', function(){
  return gulp.src('./sass/**/*.*')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(postcss([
        lost(),
        cssfixes(),
        autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}),
        mqpack(),
        emquery()
      ]))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest('./'));
});

gulp.watch('../sass/**/*.*', ['sass']);

gulp.task('default', ['sass']);



