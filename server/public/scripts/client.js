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
        swal({
            title: 'Add this Task?',
            icon: 'info',
            buttons: true,
        }).then(function(willAdd){
            $http({
                method: 'POST',
                url: '/tasks',
                data: taskIn
            }).then(function (response) {
                getTasks();
            }).catch(function (error) {
                swal('Unable to add task!');
                console.log(error);
            });
            swal('The task was created');
        }).catch(function(error){
            swal('Unable to add task')
        })
    }

    vm.orderByThis = function (type) {
        vm.orderType = type
    }

    vm.completeTask = function (taskId) {
        $http({
            method: 'PUT',
            url: '/tasks/updateTask/' + taskId
        }).then(function (response) {
            getTasks();
        }).catch(function (error) {
            swal('Unable to update Task!');
            console.log('error', error);
        })
    }

    vm.deleteTask = function (taskId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, You won't be able to get this task back!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {
                $http({
                    method: 'DELETE',
                    url: '/tasks/deleteTask/' + taskId
                }).then(function (response) {
                    getTasks();
                }).catch(function (error) {
                    swal('Unable to delete task!');
                    console.log(error);
                });
                swal('Task successfully deleted!');
            }
            else{
                swal('The task was not deleted!');
            }
        }).catch(function (error) {
            swal('Unable to delete task!');
        })
    }

    function getTasks() {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            vm.tasksList = response.data;
        }).catch(function (error) {
            swal('Unable to get tasks!');
        })
    }
    getTasks();
});

