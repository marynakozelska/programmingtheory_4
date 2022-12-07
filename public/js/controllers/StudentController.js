angular.module('StudentController',
    []).controller('StudentController', function ($scope) {
    $scope.message = 'Welcome to Student section!';
});

let myApp = angular.module('StudentController', []);
myApp.controller('StudentController', function ($scope, $http) {
        $scope.message = 'Welcome to Student section!';

        let apiUrl = "http://localhost:3000/api";

        $http.get(apiUrl + "/students").then(function (response) {
            $scope.students = response.data;
        });

        let refresh = function () {
            $http.get(apiUrl + "/students").then(function (response) {
                $scope.students = response.data;
                $scope.student = {};
                console.log($scope.student);
            });
        };

        refresh()
        $scope.addStudent = function () {
            if (document.getElementById("student_name").value.length < 3 ||
                document.getElementById("student_lastname").value.length < 3) {
                alert("Wrong name or surname!");
            } else {
                if (document.getElementById("student_bday").value.length < 6 ||
                    document.getElementById("student_group").value.length < 3) {
                    alert("You entered invalid date or group number");
                } else {
                    $http.post(apiUrl + "/students/add", $scope.student)
                        .then(function (response) {
                            console.log(response);
                            refresh();
                        });
                }
            }
        };

        $scope.delete = function (id) {
            $http.delete(apiUrl + "/students/" + id)
                .then(function (response) {
                    console.log(response);
                    refresh();
                });
        };

        $scope.edit = function (student) {
            document.getElementById("edit-student").style.display = 'block';

            document.getElementById("name").value = student.name;
            document.getElementById("lastname").value = student.lastname;
            document.getElementById("birthday").value = student.birthday;
            document.getElementById("group").value = student.group;

            $http.delete(apiUrl + "/students/" + student._id)
                .then(function (response) {
                    console.log(response);
                    refresh();
                });
            refresh();
        };

        $scope.save = function () {
            $scope.student.name = document.getElementById("name").value;
            $scope.student.lastname = document.getElementById("lastname").value;
            $scope.student.birthday = document.getElementById("birthday").value;
            $scope.student.group = document.getElementById("group").value;

            if (document.getElementById("name").value.length < 3 ||
                document.getElementById("lastname").value.length < 3) {
                alert("Wrong name or surname!");
            } else {
                if (document.getElementById("birthday").value.length < 6 ||
                    document.getElementById("group").value.length < 3) {
                    alert("You entered invalid date or group number");
                } else {
                    document.getElementById("edit-student").style.display = 'none';
                    $http.post(apiUrl + "/students/add", $scope.student)
                        .then(function (response) {
                            console.log(response);
                            refresh();
                        });
                }
            }
            refresh();
        };
    }
);


// // ----- Individual task -----
//
//     $scope.edit = function (student) {
//
//         document.getElementById("name").value = student.name;
//         document.getElementById("lastname").value = student.lastname;
//         document.getElementById("birthday").value = student.birthday;
//         document.getElementById("group").value = student.group;
//
//         console.log(student);
//         $http.delete(apiUrl + "/students/" + student._id)
//             .then(function (response) {
//                 console.log(response);
//                 refresh();
//             });
//         refresh();
//     };
//
//     $scope.save = function () {
//         $scope.student.name = document.getElementById("name").value;
//         $scope.student.lastname = document.getElementById("lastname").value;
//         $scope.student.birthday = document.getElementById("birthday").value;
//         $scope.student.group = document.getElementById("group").value;
//
//         $http.post(apiUrl + "/students/add", $scope.student)
//             .then(function (response) {
//                 console.log(response);
//                 refresh();
//             });
//
//         refresh();
//     }
