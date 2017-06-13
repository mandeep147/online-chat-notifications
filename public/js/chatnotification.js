var app = angular.module('onlinechat', ['ui.bootstrap', 'firebase']);

var inactivetab;
var inactivetab2;
var username;


app.controller('onlinechatController', function($scope, $firebaseArray, $firebaseAuth) {
    var auth = $firebaseAuth();

    window.onblur = function() {
        inactivetab = true;
    };
    window.onfocus  = function() {
        inactivetab = false;
    };

    var ref = firebase.database().ref().child('messages').limitToLast(15);
    $scope.messages = $firebaseArray(ref);


    firebase.database().ref().child('messages').on('value', function(){

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {

            window.onblur = function() {
                inactivetab = true;
            };
            window.onfocus  = function() {
                inactivetab = false;
            };


            if(inactivetab2) {
                var notification = new Notification('OnlineChat', {
                    body: "Notification: window 1",
                });

                notification.onclick = function () {
                    window.focus();
                    $('#firsttab').trigger('click');
                };
            }
        }


    });
    $scope.send = function(message) {
        $scope.messages.$add({
            message: $scope.messageText,
            date: Date.now(),
            name: $scope.name
        })
    }

    $scope.authorizeFBLogin = function(){
        auth.$signInWithPopup("facebook").then(function(firebaseUser) {

            $scope.name = firebaseUser.user.displayName;
            username = firebaseUser.user.displayName;
        }).catch(function(error) {
            console.log("failed to authenticate user:", error);
        });
    }
})


app.controller('onlinechatController2', function($scope, $firebaseArray, $firebaseAuth) {
    var auth = $firebaseAuth();

    window.onblur = function() {
        inactivetab2 = true;
    };
    window.onfocus  = function() {
        inactivetab2 = false;
    };

    var ref2 = firebase.database().ref().child('messages2').limitToLast(15);
    $scope.messages2 = $firebaseArray(ref2);


    firebase.database().ref().child('messages2').on('value', function(){

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {

            window.onblur = function() {
                inactivetab2 = true;
            };
            window.onfocus  = function() {
                inactivetab2 = false;
            };


            if(inactivetab2) {
                var notification = new Notification('OnlineChat', {
                    body: "Notification: window 2",
                });

                notification.onclick = function () {
                    window.focus();
                    $('#secondtab').trigger('click');
                };
            }
        }


    });
    $scope.send2 = function(message) {
        $scope.messages2.$add({
            message: $scope.messageText2,
            date: Date.now()
        })
    }

    $scope.authorizeFBLogin = function(){
        auth.$signInWithPopup("facebook").then(function(firebaseUser) {

            $scope.name = firebaseUser.user.displayName;
            username = firebaseUser.user.displayName;
        }).catch(function(error) {
            console.log("failed to authenticate user:", error);
        });
    }
})