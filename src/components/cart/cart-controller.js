goog.provide('template.cart.controller');

template.cart.controller = CartCtrl;

/**
 * Controller.
 * @constructor
 * @param {angular.Scope} $scope
 * @param {angular.$window} $window
 * @param {angular.$http} $http
 * @ngInject
 */
function CartCtrl($scope, $window, $http) {
  var vm = this;

  vm.templateData = 'Cart controller data';
}
