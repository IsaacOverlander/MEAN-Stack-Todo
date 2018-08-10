const taskApp = angular.module('taskApp', []);

taskApp.controller('TaskController', function($http) {
    console.log('Controller is ready');
    const vm = this;
    vm.tasksList = [];
    cm.taskToAdd = {
        name: tc.taskToAdd.name,
        description: tc.taskToAdd.description
    }

    vm.addTask = function(taskIn){
        $http({
            method: 'POST',
            url: '/addTask',
            data: taskIn
        }).then(function(response){
            console.log(response.data);
        }).catch(function(error){
            alert('Unable to add task!');
            console.log(error);
        });
           
    }
    
});

