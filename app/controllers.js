(function () {
    'use strict';

    angular.module('App')

    .controller('AppCtrl', ['$scope','TP','LxDialogService','LxNotificationService',
        function ($scope,TP,LxDialogService,LxNotificationService) {
            $scope.vm = this;
            $scope.vm.clasificacion = 'todos';
            $scope.vm.dialogId = 'detalles-elemento';

            // Almacena temporalmente los datos.
            $scope.models = {};
            $scope.elementos = [];

            // Carga los datos de un Service
            $scope.loadData = function (indice) {
                if($scope.models[indice]) {
                    $scope.vm.tabs = $scope.models[indice];
                    $scope.vm.loading = false;
                } else {
                    TP.service(indice).query(function (response) {
                        $scope.vm.tabs = response;
                        $scope.models[indice] = response;
                    },function (response) {
                        $scope.vm.error = response;
                    }).$promise.finally(function () {
                        $scope.vm.loading = false;
                    });
                }
            }

            $scope.getElemento = function (id) {
                if($scope.elementos[id]) {
                    $scope.elemento = $scope.elementos[id];
                    $scope.showElemento($scope.elemento);
                } else { 
                    LxNotificationService.info('Cargando elemento...');
                    TP.service('elementos').get({id:id},function (response) {
                        $scope.elemento = response;
                        $scope.elementos[id] = response;
                        LxNotificationService.success('Elementos cargado');
                        $scope.showElemento($scope.elemento);
                    },function (response) {
                       LxNotificationService.error('El elemento no se cargo');
                    });
                }
            }

            $scope.showElemento = function (elemento) {
                LxDialogService.open($scope.vm.dialogId);
            }

            $scope.setPosition = function (x,y) {
                $scope.vm.clasificacion = x;
                $scope.vm.activeTab = y;
            }
        }
    ])

    .controller('ElementosCtrl', ['$scope','TP',function ($scope,TP) {
        $scope.data = {};
        $scope.vm.loading = true;

        if($scope.models.elementos) {
            $scope.data.elementos = $scope.models.elementos;
            $scope.vm.loading = false;
        } else {
            TP.service('elementos').query(function (response) {
                $scope.data.elementos = response;
                $scope.models.elementos = response;
            },function (response) {
                $scope.vm.error = response;
            }).$promise.finally(function () {
                $scope.vm.loading = false;
            });
        }
    }])

    .controller('TiposCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('tipos');
    }])

    .controller('SubtiposCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('subtipos');
    }])

    .controller('EstadosCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('estados');
    }])

    .controller('SeriesCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('series');
    }])

    .controller('GruposCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('grupos');
    }])

    .controller('BloquesCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('bloques');
    }])

    .controller('PeriodosCtrl', ['$scope',function ($scope) {
        $scope.vm.loading = true;
        $scope.loadData('periodos');
    }]);
})();