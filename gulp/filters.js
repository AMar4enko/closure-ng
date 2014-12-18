var
  _ = require('lodash'),
  filter = require('gulp-filter');

module.exports = {
    scss: _.bind(filter, filter, '**/*.scss'),
    css: _.bind(filter, filter, '**/*.css'),
    js: _.bind(filter, filter, '**/*.js'),
    jade: _.bind(filter, filter, '**/*.jade'),
    other: _.bind(filter, filter, function(file){
      return (file.extname !== '.js' && file.extname !== '.css' && file.extname !== '.scss');
    }),
    fileEvents: function(){
      var passEvents = Array.prototype.slice.call(arguments);

      return filter(function(file){
        return passEvents.indexOf(file.event) > -1;
      });
    }
  };