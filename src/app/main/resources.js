'use strict';
angular.module('primangular').factory('GitHub', function Issues($resource) {
  return $resource('https://api.github.com/users/vojtajina/repos', null, {
    query: {
      isArray: true,
      method: 'GET'
    }
  });
});
