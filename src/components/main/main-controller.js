goog.provide('template.main.controller');

template.main.controller = MainCtrl;

/**
 * @ngInject
 */
function MainCtrl($scope){
  console.log($scope);
  var vm = this;
  /**
   * @expose
   */
  vm.templateData = 'Main controller data';
}
