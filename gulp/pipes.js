var
  $ = require('gulp-load-plugins')({lazy: true}),
  lazyPipe = require('lazypipe'),
  config = require('./config');

module.exports = {
  sass: lazyPipe().pipe($.sass, { errLogToConsole: true, style: 'expanded', includePaths: config.sassLibraries })
    .pipe($.autoprefixer, 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'),
  checkJs: lazyPipe().pipe($.jshint).pipe($.jshint.reporter, 'jshint-stylish'),
  jade: lazyPipe().pipe($.jade, config.jadeOptions)
};
