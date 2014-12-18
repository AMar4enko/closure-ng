var
  del = require('del'),
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')({lazy: true}),
  filters = require('./filters'),
  pipes = require('./pipes');

module.exports = {
  files: listFiles,
  generateDeps: generateDeps,
  compile: compile,
  watch: watchScripts
};

function listFiles(environment){
  return [
    'src/components/**/*.js',
    'src/env/'+environment+'.js'
  ]
}

function generateDeps(config, cb){
  return del([config.destination+'/js/build.js'], function(){
    gulp.src(listFiles(config.environment))
      .pipe($.closureDeps({
        fileName: 'build.js',
        prefix: '../../../..',
        baseDir: config.destination+'/'
      }))
      .pipe(gulp.dest(config.destination+'/js')).on('end', cb);
  });
}

function compile(config, cb){
  var compilerFlags = [];

  if(config.sourceMaps){
    compilerFlags.push('--create_source_map "'+config.destination+'/js/build.js.map'+'"')
  }

  return del([config.destination+'/js/build.js'], function(){
    gulp.src(listFiles(config.environment))
      .pipe(pipes.checkJs())
      .pipe($.closureCompiler({
        compilerPath: 'closure/compiler.jar',
        fileName: 'build.js',
        compilerFlags: {
          closure_entry_point: config.closureEntryPoint,
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          angular_pass: true,
          create_source_map: config.sourceMaps && (config.destination+'/js/build.js.map'),
          generate_exports: true,
          define: [],
          externs: [
            'closure/externs/angular-1.3.js',
            'closure/externs/angular-1.3-http-promise.js',
            'closure/externs/angular-1.3-q.js',
            'closure/externs/angular_ui_router.js'
          ],
          // Some compiler flags (like --use_types_for_optimization) don't have value. Use null.
          // use_types_for_optimization: null,
          only_closure_dependencies: true,
          output_wrapper: '(function(){%output%})();',
          warning_level: 'QUIET'
        }
      }))
      .pipe(gulp.dest(config.destination+'/js')).on('end', cb);
  });
}

function watchScripts(config){
  var
    addedChangedOnly = filters.fileEvents('added', 'changed');

  return $.watch(['src/components/**/*.js'], {emitOnGlob: false, name: 'Scripts', base: 'src/components'})
    .pipe($.plumber())
    .pipe(addedChangedOnly)
    .pipe(pipes.checkJs())
    .pipe(addedChangedOnly.restore());
}