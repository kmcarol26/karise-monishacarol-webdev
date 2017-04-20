/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("ArtistController", ArtistController);

    function ArtistController($location, MusicService,UserService,$routeParams,$sce) { //injecting UserService

        var vm = this;
        vm.trust = trust;
        vm.search=search;
        vm.getAlbums=getAlbums;
        vm.getArtistById=getArtistById;
        vm.getArtistInfo=getArtistInfo;
        vm.getAlbumPage=getAlbumPage;
        vm.signup=signUp;
        vm.login=login;
        vm.logout=logout;

        function  init() {
            vm.artistId=$routeParams.artistId;
            vm.getAlbums=getAlbums(vm.artistId);
            vm.getArtistById=getArtistById(vm.artistId);


        }init();

        function logout(){
            UserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
        }

        function signUp(user) {

               UserService
                .signUp(user)
                .then(

                    function(user) {
                        if(user){

                            var user = user;
                            $location.url("/user/home");

                        }
                    },function(err){
                        vm.error="Please enter all details";
                    });

        }


        function login(user) {
            UserService
                .login(user)
                .then(
                    function(user) {

                        if (user) {

                            $location.url("/user/home");
                        }
                    },

                    function () {
                      vm.error = "no such user";

                    }

                );

        }


        function trust(url) {
              return $sce.trustAsResourceUrl(url);
        }

        function getArtistInfo(artistName){

            MusicService
                .getArtistInfo(artistName)
                .then(
                    function(results) {

                        vm.artistInfo=results.artist.bio.content;

                    }

                );
        }

        function getArtistById(artistId) {

            MusicService
                .getArtistById(artistId)
                .then(
                    function(results) {

                        vm.artist=results;
                        vm.artistName=results.name;
                        vm.getArtistInfo=getArtistInfo(vm.artistName);

                    }

                );

        }

        function search(str,criteria) {

            MusicService
                .search(str,criteria)
                .then(
                    function(results) {

                        vm.searchResults=results;

                    }

                );

        }


        function getAlbums(artistId) {

            MusicService
                .getAlbums(artistId)
                .then(
                    function(results) {

                        vm.albums=results;

                    }

                );

        }
        function getAlbumPage(albumId) {

            $location.url("/user/home/album/"+albumId) ;

        }


    }})();
