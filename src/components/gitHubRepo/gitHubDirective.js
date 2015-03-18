'use strict';
angular.module('primangular').directive('gitHub', function () {
  return {
    restrict: 'A',
    templateUrl: 'components/gitHubRepo/github.html',
    controller: function ($scope, GitHub) {
      $scope.repos = GitHub.query();
    }
  };
});
