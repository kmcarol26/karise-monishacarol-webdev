/**
 * Created by Monisha on 3/30/2017.
 */
/**
 * Created by Monisha on 2/9/2017.
 */
(function () {

    angular
        .module("MusicApp")
        .controller("LoginController", loginController); // Instantiate a Controller called LoginController with constructor loginController

    function loginController($location, UserService) { //injecting UserService

        console.log("login controller");
        var vm = this;

        vm.login = login;

        function login(user) {
            UserService
                .userlogin(user)
                .then(
                    function(user) {

                        if (user) {
                            console.log("back login controller");
                             $location.url("/");
                        }
},

                    function (err) {

                        vm.error = "no such user";


                    }
                );

        }

    }})();
