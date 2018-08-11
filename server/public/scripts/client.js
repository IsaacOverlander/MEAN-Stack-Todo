const taskApp = angular.module('taskApp', []);

taskApp.controller('TaskController', function($http) {
    console.log('Controller is ready');
    const vm = this;
    vm.tasksList = [];
    vm.taskToAdd = {
        name: 'Sweep',
        description: 'Whole House'
    }

    vm.addTask = function(taskIn){
        console.log(taskIn);
        
        $http({
            method: 'POST',
            url: '/tasks',
            data: taskIn
        }).then(function(response){
            console.log(response.data);
        }).catch(function(error){
            alert('Unable to add task!');
            console.log(error);
        });
           
    }
    
});

