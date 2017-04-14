/**
 * Created by Monisha on 2/15/2017.
 */
/**
 * Created by Monisha on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($routeParams, $location, UserService,$rootScope) {//$routeParams is a map of all the URL attributes

        //assigning to vm makes the RHS available on the templates
        var vm = this;
        vm.register = register;

        function createUser(newUser) {
            console.log("createUser");
            console.log("newUser");
            UserService
                        .createUser(newUser)
                        .then(function(user){
                            console.log("createUser");
                            var userId=user._id;

                        },function(err){console.log(err);});

        }

        function register(user) {
            //noinspection JSUnresolvedFunction
            console.log("regi contr");

            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });
/*
            UserService
                .findUserByUsername(user.username)
                .then(function(user){
                    vm.message= " Username already taken";
                },function(){
                    UserService
                        .createUser(user)
                        .then(function (user){
                            console.log(user);
                            var userId=user._id;
                            $location.url("/user/" +userId);
                           // $location.url('/profile/' +user._id);

                        },function(){
                        vm.error = "Sorry ! Could not Register";
                    });


            });*/
        }

    }

})();

