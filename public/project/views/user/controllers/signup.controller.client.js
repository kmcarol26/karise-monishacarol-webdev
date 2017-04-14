/**
 * Created by Monisha on 3/30/2017.
 */
/**
 * Created by Monisha on 2/15/2017.
 */
/**
 * Created by Monisha on 2/10/2017.
 */
(function () {
    angular
        .module("MusicApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($routeParams, $location, UserService,$rootScope,MusicService) {//$routeParams is a map of all the URL attributes
        console.log("init register controller");
        //assigning to vm makes the RHS available on the templates
        var vm = this;
        vm.signUp = signUp;
        vm.search = search;
        vm.login=login;

        function login(){
            $location.url("/login");

        }

        function search(user) {
            console.log("search ");
            var str=user.searchStr;
            console.log(str);
            MusicService
                .search(str)
                .then(
                    function(results) {

                        vm.searchResults=results;

                    }

                );

        }
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

        function signUp(user) {
            //noinspection JSUnresolvedFunction
            console.log("signUp contr");

            UserService
                .signUp(user)
                .then(

                    function(user) {
                      if(user){

                          console.log("sign up success");
                        var user = user;
                        $rootScope.currentUser = user;
                        $location.url("/user/home");
                      }
                    },function(err){
                        vm.error="Please enter all details";
                    });

        }



    }

})();

