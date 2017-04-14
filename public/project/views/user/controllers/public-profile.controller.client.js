/**
 * Created by Monisha on 4/8/2017.
 */
/**
 * Created by Monisha on 4/8/2017.
 */
/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("PublicProfileController", PublicProfileController); // Instantiate a Controller called LoginController with constructor loginController

    function PublicProfileController($location, MusicService,UserService,$scope,$routeParams,myService,$sce) { //injecting UserService

        console.log("PublicProfileController");
        var vm = this;
        vm.trust = trust;
        vm.getArtistPage=getArtistPage;
        vm.follow=follow;
        vm.unfollow=unfollow;
       // vm.checkFollowing=checkFollowing;


        function  init() {
            vm.userId=$routeParams.uid;
            vm.friendId=$routeParams.fid;
            var promise = UserService.findUserById(vm.friendId);
            promise.then(function(user){
                if(user){
                    vm.friend = user;
                    vm.friend_followers=vm.friend.followers;
                    var followers=vm.friend_followers;
                    if(followers.indexOf(vm.userId) != -1){
                        vm.following= true;
                        console.log(vm.following);
                    }
                    else{
                        vm.following= false;
                    }


                }
            });






        }init();

        function unfollow(){
            console.log("unfollow controller");
            UserService
                .unfollow(vm.userId,vm.friendId)
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



        function follow(){
        UserService
            .follow(vm.userId,vm.friendId)
            .then(function(result){
                if(result){
            console.log("following");
                    location.reload();}
                //$location.url("/user/"+vm.userId+"/friends/"+vm.friendId);}
                else{
                    console.log("not following");
                        location.reload();
                   // $location.url("/user/"+vm.userId+"/friends/"+vm.friendId);
                }
        });
        }


        function trust(url) {
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/"+vm.userId+"/home/artist/"+artistId) ;

        }








    }})();

