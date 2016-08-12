/*
main script application
this is the main function of angular.
declare the directives here
*/

//initialize the app and its directive library
var app = angular.module('dataSourceApp',
		[
		 'ngAnimate',
		 'ngResource',
		 'ui.router',
		 'ui.bootstrap',
		 'ui.layout',
		 'eehNavigation',
		 'pascalprecht.translate'
		 ]);

app.controller('modalSave', function($scope, $http) {
    $http.get("getListOfDatabases")
    .then(function(response) {
        //First function handles success
        $scope.content = response.data;
        console.log('modal save : ',$scope.content);
    }, function(response) {
        //Second function handles error
        $scope.content = "Something went wrong";
        console.log($scope.content);
    });
});

