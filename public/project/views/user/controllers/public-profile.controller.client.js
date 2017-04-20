/**
 * Created by Monisha on 4/8/2017.
 */


(function () {

    angular
        .module("MusicApp")
        .controller("PublicProfileController", PublicProfileController); // Instantiate a Controller called LoginController with constructor loginController

    function PublicProfileController($location, MusicService, UserService, $routeParams, $sce) { //injecting UserService

        var vm = this;
        vm.trust = trust;
        vm.getArtistPage = getArtistPage;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.getFavorites = getFavorites;
        vm.checkLoggedIn = checkLoggedIn;
        vm.logout = logout;
        vm.checkFollowing = checkFollowing;


        function init() {

            vm.userId = $routeParams.uid;
            vm.friendId = $routeParams.fid;

            checkFollowing();
            checkLoggedIn();
            getFavorites();

        }

        init();

        function checkFollowing() {
            var promise = UserService.findUserById(vm.friendId);
            promise.then(function (user) {
                if (user) {
                    vm.friend = user;
                    vm.friend_followers = vm.friend.followers;
                    vm.followersCount = vm.friend_followers.length;
                    var followers = vm.friend_followers;
                    if (followers.indexOf(vm.userId) != -1) {
                        vm.following = true;
                        console.log(vm.following);
                    }
                    else {
                        vm.following = false;
                    }


                }
            });
        }

        function logout() {
            UserService
                .logout()
                .then(function () {

                    $location.url('/login');

                })
        }


        function checkLoggedIn() {
            //var deferred=$q.defer();
            UserService
                .loggedin()
                .then(function (user) {
                    if (user == '0') {
                        // deferred.reject();
                        vm.logged = false;

                    }
                    else {

                        vm.logged = true;

                    }
                });


        }

        function getFavorites(songId) {

            UserService
                .getFavorites(vm.friendId)
                .then(function (result) {
                    if (result) {
                        vm.friend = result;
                        vm.favorites = vm.friend.favorites;
                    }

                    else {

                        vm.favorites = "No songs"
                    }
                });


        }

        function unfollow() {

            UserService
                .unfollow(vm.userId, vm.friendId)
                .then(function (result) {
                    if (result)
                        location.reload();

                    else {

                        location.reload();

                    }
                });
        }


        function follow() {
            UserService
                .follow(vm.userId, vm.friendId)
                .then(function (result) {
                    if (result) {

                        location.reload();
                    }

                    else {

                        location.reload();
                    }
                });
        }


        function trust(url) {

            return $sce.trustAsResourceUrl(url);

        }

        function getArtistPage(artistId) {

            $location.url("/user/home/artist/" + artistId);

        }


    }
})();

