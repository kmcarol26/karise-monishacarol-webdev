/**
 * Created by Monisha on 4/1/2017.
 */
/**
 * Created by Monisha on 2/10/2017.
 */
(function () {
    angular
        .module("MusicApp")
        .controller("ProfileController", profileController);

    function profileController($routeParams,$location, UserService,currentUser) {//$routeParams is a map of all the URL attributes
    console.log("prof controller");
        //assigning to vm makes the RHS available on the templates
        var vm = this;
        vm.user=currentUser;

        console.log("currentuser"+currentUser);
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.unregister=unregister;
        vm.getArtistPage=getArtistPage;
        vm.removeSong=removeSong;
        vm.getFavorites=getFavorites;
        vm.unfollow=unfollow;

       //    vm.getFollowers=getFollowers;
       // vm.getFollowing=getFollowing;


        function init(){
            console.log(currentUser);
            console.log(currentUser.followers[0]);
            getFavorites(currentUser._id);

            vm.followers=[];
            vm.following=[];
            for (i=0;i<currentUser.followers.length;i++){
                UserService.findUserById(currentUser.followers[i]).
                    then(function (user) {
                        console.log(user);
                       // var followers=[];
                        vm.followers.push(user);

                });}

                for (i=0;i<currentUser.following.length;i++) {
                    UserService.findUserById(currentUser.following[i]).then(function (user) {
                        console.log(user);
                        // var followers=[];
                        vm.following.push(user);

                    });

                }
           // vm.followers=followers;
        //    console.log(vm.followers);
           // getFollowers(currentUser._id);
         //   getFollowing(currentUser._id);

        }init();


        function unfollow(friendId){
            console.log("unfollow controller");
            UserService
                .unfollow(vm.user._id,friendId)
                .then(function(result){
                    if(result)
                        location.reload();
                    // $location.url("/user/"+vm.userId+"/friends/"+vm.friendId);
                    else{
                        location.reload();
                        //  $location.url("/user/"+vm.userId+"/friends/"+vm.friendId);
                        console.log("still following");
                    }
                });
        }

        function getFollowers(userId){
            UserService
                .getFollowers(userId)
                .then(
                    function (response) {

                        console.log(response);
                        vm.followers=response.followers;
                    });

        }

      //  console.log(vm.user);
function getFavorites(userId){

    UserService
        .getFavorites(userId)
        .then(
            function (response) {

                console.log(response);
             vm.favorites=response.favorites;
            });

}


    function  removeSong(songId) {

   var sid=songId.toString();
   console.log("new song id"+sid);

        UserService
            .removeSong(sid)
            .then(
                function (response) {
                    console.log("removed");

                   location.reload() ;

                });





    }


        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/"+vm.userId+"/home/artist/"+artistId) ;

        }

        function unregister(userId){
            UserService
                .unregister(userId)
                .then(
                    function (response) {

                        $location.url("/login");
                    });


        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {

                        //vm.currentUser=null;
                        $location.url("/login");
                    });
        }

        /*
        function init() {
           // vm.userId = $routeParams['uid'];

            console.log("init");

            var promise = UserService.findUserById(vm.userId);
            promise.then(function(user){
                if(user){
                    vm.user = user;}
            });

        }

        init();*/

        function updateUser(newUser) {
            UserService
                .updateUser(newUser)
                .then(function(response) {

                    vm.message = "User successfully updated!";

                },function(err){
                       // console.log(user);
                        vm.error = "Unable to update user";
                    }

                );

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

