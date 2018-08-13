//Creating the angular app
const taskApp = angular.module('taskApp', []);
//Creating a controller for the app
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
    //function for adding tasks
    vm.addTask = function (taskIn) {
        //validation alert
        swal({
            title: 'Add this Task?',
            icon: 'info',
            buttons: true,
        }).then(function (willAdd) {
            //http POST request
            if (willAdd) {
                $http({
                    method: 'POST',
                    url: '/tasks',
                    data: taskIn
                }).then(function (response) {
                    //Refreshes the tasks
                    getTasks();
                }).catch(function (error) {
                    //alert if there is an error
                    swal('Unable to add task!');
                    console.log(error);
                });
                //alert that the task was created
                swal('The task was created');
            }
            else{
                swal('the task was not created!')
            }
            }).catch(function (error) {
                ////alert if there is an error
                swal('Unable to add task!')
            })
    }
    //function for sorting the list of tasks
    vm.orderByThis = function (type) {
        vm.orderType = type
    }
    //function to change the completed property of tasks
    vm.completeTask = function (taskId) {
        //http PUT request
        $http({
            method: 'PUT',
            url: '/tasks/updateTask/' + taskId
        }).then(function (response) {
            //Refreshes the tasks
            getTasks();
        }).catch(function (error) {
            //alert if there was an error
            swal('Unable to update Task!');
            console.log('error', error);
        })
    }
    //function to delete tasks
    vm.deleteTask = function (taskId) {
        //validation alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, You won't be able to get this task back!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {
                //http DELETE request
                $http({
                    method: 'DELETE',
                    url: '/tasks/deleteTask/' + taskId
                }).then(function (response) {
                    //Refreshes the tasks
                    getTasks();
                }).catch(function (error) {
                    //alert if there is an error
                    swal('Unable to delete task!');
                    console.log(error);
                });
                //alert that delete was successful
                swal('Task successfully deleted!');
            }
            else {
                //alert if there was an error
                swal('The task was not deleted!');
            }
        }).catch(function (error) {
            //alert if there was an error
            swal('Unable to delete task!');
        })
    }
    //function to get/refresh tasks
    function getTasks() {
        //http GET request
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function (response) {
            vm.tasksList = response.data;
        }).catch(function (error) {
            //alert if there is an error
            swal('Unable to get tasks!');
        })
    }
    //calls getTasks on page load
    getTasks();
});

