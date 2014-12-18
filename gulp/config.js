var
  fs = require('fs'),
  extend = require('extend'),
  util = require('gulp-util'),
  _ = require('lodash');

module.exports = new Config(__dirname+'/../build.json', util.env.type);

function Config(fileName, environment){
  var
    cfg = this,
    config = JSON.parse(fs.readFileSync(fileName));

  if(config.common){
    extend(this, config.common);
    delete config.common;
  }

  if(!environment) {
    environment = _.findKey(config, {default: true});

    if(!environment){
      throw 'No default environment configured';
    }
  }

  if(!config[environment]){
    throw 'No environment "'+environment+'" defined in '+fileName;
  }

  extend(this, config[environment]);

  this.environment = environment;

  if(!cfg.closureEntryPoint){
    throw 'Please, specify entryPoint for "'+environment+'" environment.'
  }
}