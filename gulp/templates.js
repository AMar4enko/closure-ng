var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')({lazy: true}),
  vinylPaths = require('vinyl-paths'),
  del = require('del'),
  config = require('./config'),
  templates = require('./templates'),
  filters = require('./filters'),
  pipes = require('./pipes');

module.exports = {
  build: buildTemplates,
  watch: watchTemplates
};

function buildTemplates(config){
  var jade_filter = filters.jade(), destDir = config.destination+'/templates', stream;

  stream =
    gulp.src(['src/components/**/*.jade','src/components/**/*.html'])
      .pipe($.plumber());

  if(!config.compile){
    return stream.pipe(jade_filter)
        .pipe($.changed(destDir, {extension: '.html'}))
      .pipe(pipes.jade())
      .pipe(jade_filter.restore())
      .pipe(gulp.dest(destDir));
  }

  return stream
    .pipe(pipes.jade())
    .pipe($.angularTemplatecache({root: 'templates/'}))
    .pipe(gulp.dest(config.destination+'/js'));
}

function watchTemplates(config){
  var
    deletedOnly = filters.fileEvents('deleted'),
    addedChangedOnly = filters.fileEvents('added', 'changed');

  return $.watch(['src/components/**/*.jade', 'src/components/**/*.html'], {emitOnGlob: false, name: 'Templates', base: 'src/components'})
    .pipe($.plumber())
    .pipe(deletedOnly)
      .pipe($.rename(function(file){
        file.dirname = '../../' + config.destination+'/templates/' + file.dirname;
        file.extname = '.html';
        return file;
      }))
      .pipe(vinylPaths(del))
    .pipe(deletedOnly.restore())
    .pipe(addedChangedOnly)
      .pipe(pipes.jade())
      .pipe(gulp.dest(config.destination+'/templates'))
    .pipe(addedChangedOnly.restore());
}