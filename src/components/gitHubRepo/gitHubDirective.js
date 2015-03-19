'use strict';
angular.module('primangular').directive('gitHub', function () {
  return {
    restrict: 'A',
    scope: {
      user: '=gitHub'
    },
    templateUrl: 'components/gitHubRepo/github.html',
    controller: function ($scope, GitHub) {


      $scope.getRepos = function () {
        $scope.repos = GitHub.query({'user': $scope.user});
      };
      $scope.$watch('user', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getRepos();
        }
      });
    }
  };
});
