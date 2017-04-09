'use strict'
var app = angular.module("app", ['LocalForageModule', 'ngRoute']);

app.factory('Page', function () {
    var main_title = "default";
    var service = {
        title: function () {
            return main_title;
        },
        set_title: function ($new_title) {
            main_title = $new_title;
        }
    };
    return service;
});

app.controller("main_controller", function ($scope, Page, $localForage, $http) {

    $scope.page = Page;
    Page.set_title("Aashita Desai");
    //$scope.offline_img = "src/img/Penguins.jpg";
    
    var images = [];
    images.push({url:'src/img/penguins.jpg'});
    images.push({url:'src/img/photo.jpg'});
    for (var i in images) {
        //getImageFile();
        $http({
            url: images[i].url,
            method: "GET",
            responseType: "blob"

        }).then(function successCallback(response) {
                $localForage.setItem('img'+ i, response.data).then(function () {
                console.log('Done');
            });
            
        }, function errorCallback(response) {
            console.log("nok");
        });
    }
    var urlCreator = window.URL || window.webkitURL;
    localforage.getItem('img1', function (err, value) {
        $scope.offline_img  = urlCreator.createObjectURL( value );
    });

});
