'use strict';

angular.module('devStatusApp')
  .controller('TaskEditCtrl', function ($scope, $routeParams, $location, ScrumData) {
        $scope.client = null;
        $scope.project = null;
        $scope.story = null;
        $scope.task = null;
        $scope.isEdit = true;

        $scope.save = function () {
            $scope.client.$update(function () {
                $location.path('/');
            })
        };

        $scope.init = function () {
            $scope.client = ScrumData.get({clientId: $routeParams.id}, function () {
                for (var x = 0; x < $scope.client.Projects.length; x++) {
                    if ($scope.client.Projects[x]._id === $routeParams.project) {
                        $scope.project = $scope.client.Projects[x];
                        for (var y = 0; y < $scope.project.Stories.length; y++) {
                            if ($scope.project.Stories[y]._id === $routeParams.story) {
                                $scope.story = $scope.project.Stories[y];
                                for(var z = 0; z < $scope.story.Tasks.length; z++){
                                    if($scope.story.Tasks[z]._id === $routeParams.task){
                                        $scope.task = $scope.story.Tasks[z];
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        $scope.init();
    });