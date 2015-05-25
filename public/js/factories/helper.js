
angular.module('materialApp')
   .factory("helper", function(){
     
     var common = function(todo){ return todo.done == true; }
     
      var helper = {
         reject: function(todos){
            return  _.reject(todos, common);       
         },
         filter: function(todos){
            return _.filter(todos, common )
         }
      };
        
      return helper;
   });