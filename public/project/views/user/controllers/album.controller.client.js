/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("AlbumController", AlbumController); // Instantiate a Controller called LoginController with constructor loginController

    function AlbumController($location, MusicService,$scope,$routeParams,myService,$sce) { //injecting UserService

        console.log("AlbumController ");
        var vm = this;
        vm.trust = trust;
        vm.search=search;
        vm.getAlbumTracks=getAlbumTracks;
        vm.getAlbumById=getAlbumById;
        vm.getArtistPage=getArtistPage;
        vm.getAlbumPage=getAlbumPage;

        function  init() {
            vm.albumId=$routeParams.albumid;
            vm.getAlbumTracks=getAlbumTracks(vm.albumId);
            vm.getAlbumById=getAlbumById(vm.albumId);

        }init();


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
