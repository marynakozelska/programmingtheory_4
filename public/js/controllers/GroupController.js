angular.module('GroupController',
    []).controller('GroupController', function ($scope) {
    $scope.message = 'Welcome to Group section!';
});

angular.module('GroupController', [])
    .controller('GroupController', function ($scope, $http) {
    $scope.message = 'Welcome to Group section!';

    let apiUrl = "http://localhost:3000/api";

    $http.get(apiUrl + "/groups").then(function (response) {
        $scope.groups = response.data;
    });

    let refresh = function () {
        $http.get(apiUrl + "/groups").then(function (response) {
            $scope.groups = response.data;
            $scope.group = {};
            console.log($scope.group);

        });
    };

    refresh()
    $scope.addGroup = function () {
        if (document.getElementById("name").value.length < 3) {
            alert("Wrong name of group!")
        } else {

            $http.post(apiUrl + "/groups/add", $scope.group)
                .then(function (response) {
                    console.log(response);
                    refresh();
                });
        }
    };

    $scope.delete = function (id) {
        $http.delete(apiUrl + "/groups/" + id)
            .then(function (response) {
                console.log(response);
                refresh();
            });
    };


    $scope.edit = function (group) {
        document.getElementById("edit-group").style.display = 'block';

        document.getElementById("nameG").value = group.name;
        $http.delete(apiUrl + "/groups/" + group._id)
            .then(function (response) {
                console.log(response);
                refresh();
            });
        refresh();
    };

    $scope.save = function () {
        $scope.group.name = document.getElementById("nameG").value;

        if (document.getElementById("nameG").value.length < 3) {
            alert("Wrong name of group!")
        } else {
            document.getElementById("edit-group").style.display = 'none';
            $http.post(apiUrl + "/groups/add", $scope.group)
                .then(function (response) {
                    console.log(response);
                    refresh();
                });
        }
        refresh();
    };
});