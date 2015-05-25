
angular.module('materialApp')
   .service("todoService", function($http){

        this.getAll = function(){
            return $http.get('/todos');
        };

        this.create = function (todo) {
            return $http.post('/todos/create', todo);
        };

        this.archive = function () {
            return $http.delete('/todos/archive');
        };

        this.update = function ( todo) {
            return $http.put('/todos/'+todo._id, todo);
        };

    });