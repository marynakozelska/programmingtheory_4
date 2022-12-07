angular.module('appRoutes', []).config(['$routeProvider',
    '$locationProvider', function ($routeProvider,
                                   $locationProvider) {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/groups', {
                templateUrl: 'views/group.html',
                controller: 'GroupController'
            })
            // students page that will use the StudentController
            .when('/students', {
                templateUrl: 'views/student.html',
                controller: 'StudentController'
            });
        $locationProvider.html5Mode(true);
    }]);