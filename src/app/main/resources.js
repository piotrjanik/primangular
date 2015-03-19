'use strict';
angular.module('primangular').factory('GitHub', function Issues($resource) {
  return $resource('https://api.github.com/users/:user/repos', {'user':'@user'}, {
    query: {
      isArray: true,
      method: 'GET'
    }
  });
});
