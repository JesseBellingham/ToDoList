 var ToDoList = angular.module('ToDoList').controller('ListDataController',
    function InitTodo($scope, ItemService) {
        $scope.ListItems = null;
        ItemService.GetListItems().then(function (d) {
            $scope.ListItems = d.data;
        }, function () {
            alert('Failed');
        });

    })






ToDoList.factory('ItemService', function ($http) {
    var factory = {};
    factory.GetListItems = function () {
        return $http.get('/Data/GetListItems');
    }
    return factory;
});

ToDoList.controller('ListDataController', ['$scope', '$http', function TodoCtrl($scope, $http) {

    $http.get('Data/GetListItems').success(function (listData) {
        $scope.todos = listData;
    });

    $scope.GetTotalTodos = function () {
        return $scope.todos.length;
    };

    $scope.RandomizeBubbles = function (Id) {       
        // There are only 8 different text bubble classes
        // This function is to randomly assign each div to a class based on the id of the todo
        // It only seems to work for certain id #'s though
        if (Id < 9) {
            return Id;
        } else {
            $scope.newNum = Id;
            while ($scope.newNum > 8) {
                $scope.newNum /= 2;
            }           
        }
        return Math.floor((Math.random() * $scope.newNum )* 2);
        
        //return $scope.randBubbles = Math.floor((Math.random() * 8) + 1);

        /*if ($scope.bubblesArray.indexOf($scope.randBubbles) = -1) {
            return $scope.randBubbles;
        } else {
            $scope.RandomizeBubbles();
        }

        return 0;*/
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
            data: { "ItemText": $scope.newItem, "ItemDone": false },
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

    $scope.StartTimer = function (reminderTime) {
        $scope.timer = window.setTimeout(function () {
            alert("You have " + $scope.todos.length + " todos waiting.");
        }, (reminderTime * 1000)* 60);
    }

    $scope.StopTimer = function () {
        window.clearTimeout($scope.timer);
    }

    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}])