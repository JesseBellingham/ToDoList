angular.module('ToDoList').controller('ListDataController',
    function InitTodo($scope, ItemService) {
    $scope.ListItem = null;
    ItemService.GetListItems().then(function (d) {
        $scope.ListItem = d.data;
    }, function () {
        alert('Failed');
    });
    
})

.factory('ItemService', function ($http) {
    var factory = {};
    factory.GetListItems = function () {
        return $http.get('/Data/GetListItems');
    }
    return factory;
})

ToDoList.controller('ListDataController', ['$scope', '$http', function TodoCtrl($scope, $http) {
    
    $http.get('Data/GetListItems').success(function(listData){
        $scope.todos = listData;   
    });
    
    $scope.GetTotalTodos = function () {
        return $scope.todos.length;
    };

    $scope.RemoveTask = function (Id) {
        $scope.todos.DeleteTodo(Id);
        $scope.todos.remove(Id);
    }

    $scope.AddTodo = function () {
        $scope.newItem = $scope.newTaskText;        
        
        $http({
            method: 'POST',
            url: '/Data/PostListItem',
            data: {"ItemText": $scope.newItem, "ItemDone": false },
            headers: { 'Content-Type': 'application/JSON' }
        }).
        success(function (data) {
            $scope.status = "Item saved";
            $scope.newTaskText = "";
            $scope.todos.push({ task: $scope.newItem, done: false });
        })     
    }

    $scope.UpdateTodoDone = function (itemId) {
        $http({
            method: 'PUT',
            url: '/Data/UpdateListItemDone' + itemId
        })
        .success(function (data) {
            $scope.todos.remove(itemId);
            $scope.status = "Item status updated";
        })
        .error(function (error) {
            $scope.status = "Item status not updated: " + error.message;
        });
    }
    // TODO jQuery alarm/reminder function
    // Cool CSS something or other
    $scope.DeleteTodo = function (itemId) {
        $http({
            method: 'DELETE',
            url: '/Data/DeleteListItem' + itemId
        })
        .success(function (data) {            
            $scope.status = "Item deleted";
        })
        .error(function (error) {
            $scope.status = "Item not deleted: " + error.message;
        });
    }

    $scope.StartTimer = $.timer(function () {
        alert("You have " + $scope.todos.length + " todos waiting.");
    });

    StartTimer.set({ time: reminderTime, autostart: false });

    $scope.StartTimer = function (reminderTime) {
        window.setTimeout(function () {
            alert("You have " + $scope.todos.length + " todos waiting.");
        }, reminderTime);
    }

    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}])