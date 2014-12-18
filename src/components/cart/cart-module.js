goog.provide('template.cart.module');
goog.require('template.cart.controller');

template.cart.module = angular.module('cart',['ui.router'], cartModuleConfig);

/**
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
function cartModuleConfig($stateProvider){
  $stateProvider.state('cart',
    {
      url: '/cart',
      templateUrl: 'templates/cart/cart.html',
      controller: template.cart.controller,
      controllerAs: 'cart'
    }
  );
}