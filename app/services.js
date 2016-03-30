(function () {
	'use strict';

	angular.module('App')

	.factory('TP', ['$resource',function ($resource) {
		return {
			service: function (model) {
				return $resource('http://api-tablaperiodica.app/'+ model +'/:id', {id: '@id'}, {
					query:{withCredentials:true,isArray:true},
					get:{withCredentials:true}
				});
			}
		}
	}])
})();