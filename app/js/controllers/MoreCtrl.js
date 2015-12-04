
angular.module('weatherApp')
    .controller('MoreCtrl', ['$scope', '$stateParams', 'cityWeatherService',
        function ($scope, $stateParams, cityWeatherService) {
            $scope.data = {
                weather: {}
            };

            init();


            function init () {
                cityWeatherService.getCityWeather($stateParams.cityid).then(function (cityWeather) {
                    $scope.data.weather = cityWeather.weather;
                });
            }
        }
    ]);