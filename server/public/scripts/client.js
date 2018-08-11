const taskApp = angular.module('taskApp', []);

taskApp.controller('TaskController', function($http) {
    console.log('Controller is ready');
    const vm = this;
    vm.tasksList = [];
    vm.taskToAdd = {
        name: 'Sweep',
        description: 'Whole House',
        completed: false
    }

    vm.addTask = function(taskIn){
        console.log(taskIn);
        
        $http({
            method: 'POST',
            url: '/tasks',
            data: taskIn
        }).then(function(response){
            console.log(response.data);
            getTasks();
        }).catch(function(error){
            alert('Unable to add task!');
            console.log(error);
        });
           
    }

    function getTasks(){
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function(response){
            console.log(response.data);
            vm.tasksList = response.data;
            console.log(vm.tasksList);
            
        }).catch(function(error){
            alert('Unable to get tasks!');
        })
    }

    getTasks();
});

