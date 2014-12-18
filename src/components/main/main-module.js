goog.provide('template.main.module');

goog.require('template.main.controller');
goog.require('template.main.directive');

template.main.module = angular.module('main',['ui.router', template.main.directive.name], mainModuleConfig);

/**
 * Main page controller
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
function mainModuleConfig($stateProvider){
  $stateProvider.state('main',
    {
      url: '/main',
      templateUrl: 'templates/main/main.html',
      controller: template.main.controller,
      controllerAs: 'main'
    }
  )
}
