var
  $ = require('gulp-load-plugins')({lazy: true}),
  through2 = require('through2'),
  index = require('./gulp/index'),
  gulp = require('gulp'),
  lazyPipe = require('lazypipe'),
  runSequence = require('run-sequence'),
  scripts = require('./gulp/scripts'),
  styles = require('./gulp/styles'),
  templates = require('./gulp/templates'),
  del = require('del'),
  filters = require('./gulp/filters');
  config = require('./gulp/config');

function runPipe(pipe){
  return through2.obj(function(file, enc, cb){
    var self = this;
    pipe().on('end', function(){
      self.push(file);
      cb();
    });
  });
}

gulp.task('scripts', function(cb){
  if(config.compile){
    scripts.compile(config, cb);
  }else{
    scripts.generateDeps(config, cb);
  }
});

gulp.task('templates', function(){
  return templates.build(config);
});

gulp.task('index', function(){
  return index.build(config);
});

gulp.task('styles', function(){
  return styles.build(config);
});

gulp.task('connect', function(){
  $.connect.server({
    root: [__dirname],
    port: 5000,
    livereload: true
  });
});

gulp.task('clean', function(cb){
  del([config.destination], cb);
});

gulp.task('build', function(cb){
  runSequence(
    ['clean'],
    ['scripts','styles','templates'],
    ['index'],
    cb
  );
});

gulp.task('watch', ['connect', 'build'], function(){
  var
    stylesAddedDeleted = filters.fileEvents('added','deleted');
  templates.watch(config, $.connect)
    .pipe($.connect.reload());
  styles.watch(config, $.connect)
    .pipe(stylesAddedDeleted)
      .pipe(runPipe(lazyPipe().pipe(index.build, config)))
    .pipe(stylesAddedDeleted.restore())
    .pipe($.connect.reload());
  scripts.watch(config, $.connect)
    .pipe($.connect.reload());

  $.watch(['bower.json','src/index.jade'])
    .pipe(runPipe(lazyPipe().pipe(index.build, config)))
    .pipe($.connect.reload());
});

gulp.task('default', ['watch']);