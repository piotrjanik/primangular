(function(){
	'use strict';

	angular.module('vagrant', [ 'ngRoute','vagrant-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();