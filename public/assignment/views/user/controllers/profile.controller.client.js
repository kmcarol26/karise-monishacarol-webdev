/**
 * Created by Monisha on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams,$location, UserService) {//$routeParams is a map of all the URL attributes

        //assigning to vm makes the RHS available on the templates
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;


        function init() {
            vm.userId = $routeParams['uid'];
            var promise = UserService.findUserById(vm.userId);
            promise.then(function(user){
                if(user){
                vm.user = user;}
            });

        }

        init();

        function updateUser(newUser) {
            UserService
                .updateUser(vm.userId, newUser)
                .then(function(user){
                    if (user != null) {

                        vm.message = "User successfully updated!"
                    }
                    else {
                        vm.error = "Unable to update user";
                    }

                });





        }

        function deleteUser(user) {
            var answer  = confirm("Are you sure?");

            if(answer) {
                UserService
                    . deleteUser(user._id)
                    .then(function(){
                        $location.url("/login");
                        //vm.message = "User removed";
                    },function(){
                        vm.error = "Unable to remove user";
                    });
            }

        }


    }


})();
