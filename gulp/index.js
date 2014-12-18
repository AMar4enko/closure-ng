var
  gulp = require('gulp'),
  pipes = require('./pipes'),
  $ = require('gulp-load-plugins')({lazy: true}),
  mainBowerFiles = require('main-bower-files');

module.exports = {
  build: buildIndexView
};

function buildIndexView(config){
  var
    indexStream = gulp.src('src/index.jade')
            .pipe($.plumber())
            .pipe(pipes.jade())
            .pipe($.rename({dirname: '../'+config.destination}))
            .pipe($.inject(
                gulp.src(mainBowerFiles({env: config.environment})),
                {
                  starttag: '<!-- vendor:{{ext}}-->',
                  endtag: '<!-- endinject-->',
                  relative: true
                }
              )
            )
            .pipe($.inject(
                gulp.src(config.destination+'/css/**/*.css'),
                {
                  starttag: '<!-- application:css-->',
                  endtag: '<!-- endinject-->',
                  relative: true
                }
              )
            );

    if(!config.compile){
      indexStream = indexStream.pipe(
        $.replace('<!-- dev:require-->', '<script type="text/javascript">goog.require(\''+config.closureEntryPoint+'\')</script>')
      );
    }else{
      indexStream = indexStream.pipe(
        $.replace('<!-- templates-->', '<script type="text/javascript" src="js/templates.js"></script>')
      );
    }

  return indexStream.pipe(gulp.dest('./fakedir'));
}