var
  browsersync  = require('browser-sync').create(),
  del          = require('del'),
  gulp         = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat       = require('gulp-concat'),
  imagemin     = require('gulp-imagemin'),
  jasmine      = require('gulp-jasmine'),
  sass         = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),
  dev          = {
    files: [
      './favicon.ico',
      './*.txt',
      './*.html',
      './*.png',
      './*.xml'
    ],
    css: './scss/main.scss',
    js: [
      './js/userbox.js',
      './js/repobox.js',
      './js/plugins.js',
      './js/main.js'
    ],
    img:   './img/**'
  },
  dist         = {
    root:  './site/',
    files: distFiles,
    css:   './site/css/',
    js:    './site/js/',
    img:   './site/img/'
  };

function distFiles() {
  return dev.files.map(function(f) {
    return dist.root + f.substr(2);
  });
}

gulp.task('scss', function() {
  return gulp
    .src(dev.css)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', function() {
  return gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('img', function() {
  return gulp
    .src(dev.img)
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task('clean', function () {
  del.sync(dist.files());
});

gulp.task('dist', ['clean'], function () {
  return gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
});

gulp.task('watch', function() {
  gulp.watch('./scss/**', ['scss']);
  gulp.watch(dev.js,      ['js']);
  gulp.watch(dev.img,     ['img']);
  gulp.watch(dev.files,   ['dist']);
  gulp.watch('./scss/**', browsersync.reload);
  gulp.watch(dev.js,      browsersync.reload);
  gulp.watch(dev.img,     browsersync.reload);
  gulp.watch(dev.files,   browsersync.reload);
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: dist.root,
      routes: {
        '/test' : 'js'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('default', ['scss', 'js', 'img', 'dist', 'watch', 'server']);

gulp.task('specs', function () {
  return gulp
    .src('js/spec/*.js')
    .pipe(jasmine());
});
