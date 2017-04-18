/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("AlbumController", AlbumController); // Instantiate a Controller called LoginController with constructor loginController

    function AlbumController($location, MusicService,UserService,$scope,$routeParams,$sce) { //injecting UserService

        console.log("AlbumController ");
        var vm = this;
        vm.trust = trust;
        vm.search=search;
        vm.getAlbumTracks=getAlbumTracks;
        vm.getAlbumById=getAlbumById;
        vm.getArtistPage=getArtistPage;
        vm.getAlbumPage=getAlbumPage;
        vm.signup=signUp;
        vm.login=login;
        vm.logout=logout;

        function  init() {
            vm.albumId=$routeParams.albumid;
            vm.getAlbumTracks=getAlbumTracks(vm.albumId);
            vm.getAlbumById=getAlbumById(vm.albumId);
            checkLoggedIn();


        }init();

        function logout(){
            UserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
        }


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


        function checkLoggedIn() {
            //var deferred=$q.defer();
            UserService
                .loggedin()
                .then(function(user){
                    if(user=='0'){
                       // deferred.reject();
                        vm.logged=false;
                        console.log(vm.logged);

                    }
                    else{
                        vm.logged=true;
                        console.log(vm.logged);
                    }
                });


        }


        function trust(url) {
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }



        function search(str,criteria) {
            console.log("search ");
            console.log(str);
            MusicService
                .search(str,criteria)
                .then(
                    function(results) {
                        console.log("back in ALBUM controller ");

                        vm.searchResults=results;
                        console.log(vm.searchResults);
                    }

                );

        }
        function getAlbumPage(albumId) {

            console.log("get album page ");

            $location.url("/user/home/album/"+albumId) ;

        }
        function getAlbumById(albumId) {
            console.log("get album by Id ");
            console.log(albumId);
            MusicService
                .getAlbumById(albumId)
                .then(
                    function(results) {
                        console.log("back in controller");
                        vm.album=results;
                    }

                );

        }


        function getAlbumTracks(albumId) {
            console.log("get album ");
            console.log(albumId);
            MusicService
                .getAlbumTracks(albumId)
                .then(
                    function(results) {
                        console.log("back in controller");

                        vm.albumTracks=results;
                        console.log(vm.albumTracks);

                    }

                );

        }
        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/home/artist/"+artistId) ;

        }
    }})();
