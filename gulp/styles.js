var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')({lazy: true}),
  del = require('del'),
  vinylPaths = require('vinyl-paths'),
  filters = require('./filters'),
  config = require('./config'),
  pipes = require('./pipes');

module.exports = {
  build: buildStyles,
  watch: watchStyles
};

function buildStyles(config){
  return gulp.src('src/components/**/*.scss')
    .pipe($.plumber())
    .pipe(pipes.sass())
    .pipe(gulp.dest(config.destination+'/css'));
}

function watchStyles(config){
  var
    deletedOnly = filters.fileEvents('deleted'),
    addedChangedOnly = filters.fileEvents('added', 'changed');

  return $.watch(['src/components/**/*.scss'], {emitOnGlob: false, name: 'Styles', base: 'src/components'})
    .pipe($.plumber())
    .pipe(deletedOnly)
      .pipe($.rename(function(file){
        file.dirname = '../../' + config.destination+'/css/' + file.dirname;
        file.extname = '.css';
        return file;
      }))
      .pipe(vinylPaths(del))
    .pipe(deletedOnly.restore())
    .pipe(addedChangedOnly)
      .pipe(pipes.sass())
      .pipe(gulp.dest(config.destination+'/css'))
    .pipe(addedChangedOnly.restore());
}