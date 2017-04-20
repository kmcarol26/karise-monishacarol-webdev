/**
 * Created by Monisha on 4/1/2017.
 */

(function () {
    angular
        .module("MusicApp")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService, currentUser) {

        var vm = this;
        vm.user = currentUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.unregister = unregister;
        vm.getArtistPage = getArtistPage;
        vm.removeSong = removeSong;
        vm.getFavorites = getFavorites;
        vm.unfollow = unfollow;
        vm.checkFollowing = checkFollowing;
        vm.checkFollowers = checkFollowers;


        function init() {

            vm.followers = [];
            vm.following = [];

            getFavorites(currentUser._id);
            checkFollowers();

        }

        init();

        function checkFollowers() {
            for (i = 0; i < currentUser.followers.length; i++) {
                UserService.findUserById(currentUser.followers[i]).then(function (user) {

                    vm.followers.push(user);

                });
            }

        }

        function checkFollowing() {
            for (i = 0; i < currentUser.following.length; i++) {
                UserService.findUserById(currentUser.following[i]).then(function (user) {

                    vm.following.push(user);

                });

            }


        }


        function unfollow(friendId) {

            UserService
                .unfollow(vm.user._id, friendId)
                .then(function (result) {
                    if (result)
                        location.reload();

                    else {

                        location.reload();

                    }
                });
        }

        function getFollowers(userId) {
            UserService
                .getFollowers(userId)
                .then(
                    function (response) {

                        vm.followers = response.followers;

                    });

        }


        function getFavorites(userId) {

            UserService
                .getFavorites(userId)
                .then(
                    function (response) {

                        vm.favorites = response.favorites;

                    });

        }


        function removeSong(songId) {

            var sid = songId.toString();

            UserService
                .removeSong(sid)
                .then(
                    function (response) {

                        location.reload();

                    });

        }


        function getArtistPage(artistId) {

            $location.url("/user/" + vm.userId + "/home/artist/" + artistId);

        }

        function unregister(userId) {
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

                        $location.url("/login");

                    });
        }


        function updateUser(newUser) {
            UserService
                .updateUser(newUser)
                .then(function (response) {

                        vm.message = "User successfully updated!";

                    }, function (err) {
                        // console.log(user);
                        vm.error = "Unable to update user";
                    }
                );

        }

        function deleteUser(user) {
            var answer = confirm("Are you sure?");

            if (answer) {
                UserService
                    .deleteUser(user._id)
                    .then(function () {

                        $location.url("/login");

                    }, function () {

                        vm.error = "Unable to remove user";

                    });
            }

        }


    }


})();

