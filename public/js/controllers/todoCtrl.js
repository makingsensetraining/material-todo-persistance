'use strict';

angular.module('materialApp')
  .controller('todoCtrl', function todoCtrl($scope, $location, helper, todoService) {

        todoService.getAll()
            .success(function (response, status, headers, config) {
                $scope.todos = response
            })
            .error(function (response, status, headers, config) {
                console.log(response);
            });

        $scope.addTodo = function () {

            todoService.create({ text: $scope.todoText, done: false })
                .success(function (response, status, headers, config) {
                    $scope.todos = response;
                    $scope.todoText = '';
                })
                .error(function (response, status, headers, config) {
                    console.log(response);
                });

        };

        $scope.changedSelection = function (todo) {

            todoService.update(todo)
                .success(function (response, status, headers, config) {
                    $scope.todos = response;
                    $scope.completedCount = helper.filter($scope.todos);
                })
                .error(function (response, status, headers, config) {
                    console.log(response);
                });

        };

        $scope.archive = function () {

            todoService.archive()
                .success(function (response, status, headers, config) {
                    $scope.todos = response;
                    $scope.completedCount = helper.filter($scope.todos);
                })
                .error(function (response, status, headers, config) {
                    console.log(response);
                });


        };


    });