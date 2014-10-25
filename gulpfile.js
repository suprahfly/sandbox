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
var cached       = require('gulp-cached');
var changed      = require('gulp-changed');
var livereload   = require('gulp-livereload');
var stylish      = require('jshint-stylish');
var wiredep      = require('wiredep');
var del          = require('del');


/* ------------------------------- *\
             APP PATHS
\* ------------------------------- */

var Paths    = {};

Paths.App    = 'client/app';
Paths.Assets = 'client/assets';
Paths.Base   = process.cwd();
Paths.Client = 'clent/';
Paths.Components = 'client/components';
Paths.Tests  = 'tests';
Paths.Vendor = 'clent/vendor';
Paths.Views  = 'clent/app/views';
Paths.Server = 'server';
Paths.Static = 'static';


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
  return gulp.src(Paths.views.templates+'/**.html')
    .pipe(changed(Paths.views.partials))
    .pipe(vtransform(bem.processStream))
    .pipe(gulp.dest(Paths.views.partials));
});

gulp.task('jshint', function () {
  return gulp.src(Paths.app.scripts + '/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});