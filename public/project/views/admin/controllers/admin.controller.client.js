/**
 * Created by Monisha on 4/1/2017.
 */
/**
 * Created by Monisha on 3/30/2017.
 */
/**
 * Created by Monisha on 2/9/2017.
 */
(function () {

    angular
        .module("MusicApp")
        .controller("AdminController", AdminController); // Instantiate a Controller called LoginController with constructor loginController

    function AdminController($location,UserService,$routeParams,$rootScope,adminUser) { //injecting UserService

        console.log("AdminController ");
        var vm = this;
        vm.adminUser=adminUser;
        vm.deleteUser=deleteUser;
        vm.findAllUsers=findAllUsers;
        vm.editUser=editUser;
        vm.createNewUser=createNewUser;
        vm.logout=logout;




        function  init() {

            findAllUsers();


        }init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        vm.adminUser=null;
                        $location.url("/login");
                    });
        }

        function createNewUser(user){
            UserService
                .createNewUser(user)
                .then(function (user){
                    vm.error="";
                  vm.message="New User created";
                  findAllUsers();
                },function(err){
                    vm.message="";
                    vm.error="User Creation Failed";
                    findAllUsers();
                } );
        }

        function editUser(user){
            UserService
                .editUser(user)
                .then(function (user){
                    vm.error="";
                    vm.message="User  updated";
                    findAllUsers();
                },function(err){
                    vm.message="";
                    vm.error="User could not be updated";
                    findAllUsers();
                } );
        }

        function findAllUsers(){
            UserService
                .findAllUsers()
                .then(renderUsers);
        }
        function renderUsers(users){
            vm.users=users;

        }

        function deleteUser(user){
            UserService
                .deleteUser(user._id)
                .then(function (user){
                    vm.error="";
                    vm.message="User  deleted";
                    findAllUsers();
                },function(err){
                    vm.message="";
                    vm.error="User could not be deleted";
                    findAllUsers();
                } );
        }





    }})();
