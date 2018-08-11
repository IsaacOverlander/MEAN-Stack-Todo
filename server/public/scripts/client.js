const taskApp = angular.module('taskApp', []);

taskApp.controller('TaskController', function ($http) {
    console.log('Controller is ready');
    const vm = this;
    vm.orderType = 'completed';
    vm.tasksList = [];
    vm.taskToAdd = {
        name: 'Sweep',
        description: 'Whole House',
        completed: false,
        category: 'House Work'
    }

    vm.addTask = function (taskIn) {
        console.log(taskIn);
        let confirmation = confirm('add Task?');
        if (confirmation === true) {
            $http({
                method: 'POST',
                url: '/tasks',
                data: taskIn
            }).then(function (response) {
                getTasks();
            }).catch(function (error) {
                alert('Unable to add task!');
                console.log(error);
            });
        }
    }

    vm.orderByThis = function (type){
        vm.orderType = type
        console.log(vm.orderType);
    }

    vm.completeTask = function (taskId) {
        $http({
            method: 'PUT',
            url: '/tasks/updateTask/' + taskId
        }).then(function (response) {
            getTasks();
        }).catch(function (error) {
            alert('Unable to update Task!');
            console.log('error', error);
        })
    }

    vm.deleteTask = function (taskId) {
        let confirmation = confirm('delete task?');
        if (confirmation === true) {
            $http({
                method: 'DELETE',
                url: '/tasks/deleteTask/' + taskId
            }).then(function (response) {
                getTasks();
            }).catch(function (error) {
                alert('Unable to delete task!');
                console.log(error);
            })
        }
    }

    function getTasks() {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            vm.tasksList = response.data;
        }).catch(function (error) {
            alert('Unable to get tasks!');
        })
    }

    getTasks();
});

