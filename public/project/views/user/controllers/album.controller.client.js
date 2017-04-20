(function () {

    angular
        .module("MusicApp")
        .controller("AlbumController", AlbumController); // Instantiate a Controller called LoginController with constructor loginController

    function AlbumController($location, MusicService, UserService, $routeParams, $sce) { //injecting UserService

        var vm = this;
        vm.trust = trust;
        vm.search = search;
        vm.getAlbumTracks = getAlbumTracks;
        vm.getAlbumById = getAlbumById;
        vm.getArtistPage = getArtistPage;
        vm.getAlbumPage = getAlbumPage;
        vm.signup = signUp;
        vm.login = login;
        vm.logout = logout;

        function init() {
            vm.albumId = $routeParams.albumid;
            vm.getAlbumTracks = getAlbumTracks(vm.albumId);
            vm.getAlbumById = getAlbumById(vm.albumId);
            checkLoggedIn();
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }


        function login(user) {
            UserService
                .login(user)
                .then(
                    function (user) {

                        if (user) {
                            $location.url("/user/home");
                        }
                    },

                    function () {

                        vm.error = "no such user";
                        console.log(vm.error);

                    }
                );


        }

        function signUp(user) {

            UserService
                .signUp(user)
                .then(
                    function (user) {
                        if (user) {

                            var user = user;

                            $location.url("/user/home");
                        }
                    }, function (err) {
                        vm.error = "Please enter all details";
                    });

        }


        function checkLoggedIn() {

            UserService
                .loggedin()
                .then(function (user) {
                    if (user == '0') {
                        // deferred.reject();
                        vm.logged = false;
                        console.log(vm.logged);

                    }
                    else {
                        vm.logged = true;
                        console.log(vm.logged);
                    }
                });


        }


        function trust(url) {
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }


        function search(str, criteria) {
            console.log("search ");
            console.log(str);
            MusicService
                .search(str, criteria)
                .then(
                    function (results) {
                        vm.searchResults = results;
                        console.log(vm.searchResults);
                    }
                );

        }

        function getAlbumPage(albumId) {

            $location.url("/user/home/album/" + albumId);

        }

        function getAlbumById(albumId) {

            MusicService
                .getAlbumById(albumId)
                .then(
                    function (results) {

                        vm.album = results;
                    }
                );

        }


        function getAlbumTracks(albumId) {

            MusicService
                .getAlbumTracks(albumId)
                .then(
                    function (results) {
                        vm.albumTracks = results;


                    }
                );

        }

        function getArtistPage(artistId) {

            $location.url("/user/home/artist/" + artistId);

        }
    }
})();
