var gitApp = angular.module('GitApp', ['ngRoute']);

gitApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/UserInfo', {
        templateUrl: 'views/UserInfo.htm',
        controller: 'GitHubCtrl'
    }).when('/Repositories', {
        templateUrl: 'views/Repositories.htm',
        controller: 'GitHubCtrl'
    })
} ]);

var GitHubCtrl = gitApp.controller('GitHubCtrl', function ($scope, $http, $location) {
    $scope.SearchUser = false;
    $scope.SearchRepos = false;

    $scope.getGitInfo = function () {
        $scope.userNotFound = false;
        $scope.loaded = false;

        if ($scope.userName == "undefined") $scope.userName = "";

        $http.get("https://api.github.com/users/" + $scope.userName)
               .success(function (data) {
                   if (data.name == "") data.name = data.login;
                   $scope.user = data;
                   $scope.loaded = true;
               })
               .error(function () {
                   $scope.userNotFound = true;
               });
    }

    $scope.getGitRepos = function () {
        $scope.reposFound = false;
        alert($scope.userName);
        if ($scope.userName == "undefined") $scope.userName = "";

        $http.get("https://api.github.com/users/" + $scope.userName + "/repos").success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
        });
    }


    $scope.UserSearch = function () {
        $scope.userName = "";
        $scope.SearchUser = true;
        $scope.SearchRepos = false;
    }

    $scope.ReposSearch = function () {
        $scope.userName = "";
        $scope.SearchUser = true;
        $scope.SearchRepos = true;
    }
});




