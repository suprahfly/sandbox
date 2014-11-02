var gulp         = require('gulp');


/* ------------------------------- *\
               STYLES
\* ------------------------------- */

var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-minify-css');


/* ------------------------------- *\
               SCRIPS
\* ------------------------------- */

var uglify       = require('gulp-uglify');


/* ------------------------------- *\
                HTML
\* ------------------------------- */

var bem          = require('expandobem');
var useref       = require('gulp-useref');
var vtransform   = require('vinyl-transform');
var preprocess   = require('gulp-preprocess');


/* ------------------------------- *\
               IMAGES
\* ------------------------------- */

var baseimg      = require('gulp-baseimg');


/* ------------------------------- *\
                LINT
\* ------------------------------- */

var jshint       = require('gulp-jshint');
var recess       = require('gulp-recess');


/* ------------------------------- *\
                UTILS
\* ------------------------------- */

var gulpif       = require('gulp-if');
var webserver    = require('gulp-webserver');
var cached       = require('gulp-cached');
var changed      = require('gulp-changed');
var livereload   = require('gulp-livereload');
var stylish      = require('jshint-stylish');
var wiredep      = require('wiredep').stream;
var del          = require('del');


/* ------------------------------- *\
             APP PATHS
\* ------------------------------- */

var Paths        = {};

Paths.Base       =  process.cwd();
Paths.Client     = 'client/';
Paths.App        = 'client/app';
Paths.Assets     = 'client/assets';
Paths.Components = 'client/components';
Paths.Vendor     = 'client/vendor';
Paths.Views      = 'client/app/views';
Paths.Server     = 'server';
Paths.Static     = 'static';
Paths.Tests      = 'tests';
Paths.Tmp        = '.tmp';


Paths.app    = {
  scripts    : Paths.App + '/scripts',
  styles     : Paths.App + '/styles'
};

Paths.static = {
  fonts      : Paths.Static + '/fonts',
  json       : Paths.Static + '/json',
  images     : Paths.Static + '/images',
  scripts    : Paths.Static + '/scripts',
  styles     : Paths.Static + '/styles'
};

Paths.views  = {
  partials   : Paths.Views + '/partials',
  templates  : Paths.Views + '/templates'
};




/* ------------------------------- *\
                TASKS
\* ------------------------------- */

gulp.task('bem', function () {
  return gulp.src(Paths.views.templates+'/*.html')
    .pipe(changed(Paths.views.partials))
    .pipe(gulpif(function (file) {
      if (file.path.search('index.html')) return true;
      return false;
    }, wiredep({ignorePath: /\.\.\//g})))
    .pipe(vtransform(bem.processStream))
    .pipe(gulp.dest(Paths.views.partials))
    .pipe(livereload());
});

gulp.task('jshint', function () {
  return gulp.src(Paths.app.scripts + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('styles', function () {
  return gulp.src(Paths.app.styles+'/*.+(scss|sass)')
    .pipe(sass({
      trace: true,
      precision: 5,
      lineNumbers: true
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(Paths.Tmp + '/styles'))
});

gulp.task('wiredep', function () {
  return gulp.src(Paths.views.partials+'/index.html')
    .pipe(changed(Paths.views.partials))
    .pipe(wiredep({ignorePath: /\.\.\//g}))
    .pipe(gulp.dest(Paths.views.partials))
});

gulp.task('watch', function () {
  // gulp.watch(['app/assets/**'], function (event) {
    // gulp.start('copy');
  // });
  livereload.listen();
  gulp.watch([Paths.views.templates+'/**/*.html'], ['bem']);
  gulp.watch([Paths.app.styles+'/**/*.+(sass|scss)'], ['styles']);
  gulp.watch([Paths.app.scripts+'/**/*.js'], ['jshint']).on('change', livereload.changed);
  gulp.watch([Paths.Tmp +'/styles/*.css']).on('change', livereload.changed);
  // gulp.watch(['views/templates-bem/*.html'], ['bem']);
  // gulp.watch(['views/templates/index.html', 'bower.json'], ['wiredep']).on('change', livereload.changed);
  // gulp.watch(['views/templates/**/*', 'public/styles/**', 'public/scripts/**']).on('change', livereload.changed);
});

gulp.task('server', ['bem', 'styles', 'watch'], function() {
  gulp.src([
    Paths.views.partials,
    Paths.Tmp,
    Paths.Client
  ]).pipe(webserver({
      port: 3000,
      fallback: 'index.html',
      open: true
    }));
});