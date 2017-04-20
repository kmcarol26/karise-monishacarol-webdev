/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("FriendsController", FriendsController); // Instantiate a Controller called LoginController with constructor loginController

    function FriendsController($location, MusicService,UserService,$routeParams,$sce) { //injecting UserService

        var vm = this;
        vm.trust = trust;
        vm.searchFriends=searchFriends;
        vm.search=search;
        vm.getAlbums=getAlbums;
        vm.getArtistById=getArtistById;
        vm.getArtistInfo=getArtistInfo;
        vm.getAlbumPage=getAlbumPage;


        function  init() {
            vm.userId=$routeParams.uid;
            vm.artistId=$routeParams.artistId;
            vm.getAlbums=getAlbums(vm.artistId);
            vm.getArtistById=getArtistById(vm.artistId);

        }init();



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

        function searchFriends(str) {

            UserService
                .searchFriends(vm.userId,str)
                .then(
                    function(results) {

                        vm.people=results;

                    },function(err){

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

            $location.url("/user/"+vm.userId+"/home/album/"+albumId) ;

        }


    }})();

