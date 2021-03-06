
angular.module('weatherApp')
    .controller('HomeCtrl', ['$scope', '$state', 'cityWeatherService', 'initService',
        function ($scope, $state, cityWeatherService, initService) {
            $scope.data = {
                cityList: []
            };

            $scope.$on('$ionicView.beforeEnter', function () {
                initService.initPromise.then(function () {
                    init();
                });
            });

            var cityIndex = 0;
            $scope.slideHasChanged = function (index) {
                cityIndex = index;
                updateWeather(index);
            };
            $scope.goManager = function () {
                $state.go('manager');
            };
            $scope.goMore = function () {
                $state.go('more', {
                    cityid: $scope.data.cityList[cityIndex].cityid
                });
            };
            $scope.goQuality = function () {
                $state.go('quality', {
                    cityid: $scope.data.cityList[cityIndex].cityid
                });
            };

            function init () {
                $scope.data.cityList = cityWeatherService.getCityList(true);
                if ($scope.data.cityList.length === 0) {
                    return;
                }
                updateWeather(cityIndex);
            }
            function updateWeather (index) {
                var weather = $scope.data.cityList[index].weather;
                if (weather) {
                    return;
                }
                cityWeatherService.getCityWeather($scope.data.cityList[index].cityid).then(function (cityWeather) {
                    $scope.data.cityList[index].weather = cityWeather.weather;
                    $scope.data.cityList[index].future = cityWeather.future;
                });
            }
        }
    ]);