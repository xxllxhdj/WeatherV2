
angular.module('weatherApp')
    .controller('ManagerCtrl', ['$scope', 'cityWeatherService', function ($scope, cityWeatherService) {
        $scope.data = {
            cityList: []
        };

        $scope.$on('$ionicView.beforeEnter', init);

        $scope.deleteCity = function (cityId) {
            cityWeatherService.deleteCity(cityId).then(function () {
                init();
            });
        };

        function init () {
            $scope.data.cityList = cityWeatherService.getCityList();
        }
    }]);