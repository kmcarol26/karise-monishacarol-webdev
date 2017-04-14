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

    function loginController($location, UserService,$rootScope) { //injecting UserService

        console.log("login controller");
        var vm = this; // vm (viewModel) refers to the current instance. We dont use $scope here so that we know which
        // controller's instance objects are being used in the template
        //$location is used to access n manipulate the URL
        //Event Handlers are all declared here

        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(user) {

                        if (user) {
                            console.log("success");

                            //  var user = response.data;

                            $rootScope.currentUser = user;
                            $location.url("/user/home");
                        }
},

                    function () {
                        console.log("fail");
                        vm.error = "no such user";
                        console.log(vm.error);

                    }




                );




        }}})();
