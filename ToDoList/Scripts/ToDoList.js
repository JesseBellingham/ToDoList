var ToDoList = angular.module('ToDoList', ['ngRoute']);


ToDoList.controller('HomeController', function DisplayMessage($scope) {
    $scope.Message = "A message";
})

ToDoList.controller('HomeController', function TodoCtrl($scope) {

    $scope.todos = [
        { task: 'Task 1', done: false },
        { task: 'Task 2', done: false },
        { task: 'Task 3', done: false }
    ];
    $scope.getTotalTodos = function () {
        return $scope.todos.length;
    };
    $scope.removeTask = function (i) {
        $scope.todos.remove(i);
    }
    $scope.addTodo = function () {
        $scope.todos.push({ task: $scope.newTaskText, done: false });
        $scope.newTaskText = "";
    };
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
})

// Array Remove



