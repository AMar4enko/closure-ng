goog.provide('template.application');

goog.require('template.cart.module');
goog.require('template.main.module');
goog.require('template.environment');
goog.require('template.templates');

template.application = angular.module('application', [
  template.cart.module.name,
  template.main.module.name,
  template.environment.name,
  template.templates.name
]);