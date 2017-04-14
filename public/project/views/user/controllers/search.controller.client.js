/**
 * Created by Monisha on 4/8/2017.
 */
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
        .controller("SearchController", SearchController); // Instantiate a Controller called LoginController with constructor loginController

    function SearchController($location, MusicService,UserService,$scope,$routeParams, $sce,myService,$window,$rootScope) { //injecting UserService

        console.log("SearchController ");
        var vm = this;
        vm.trust = trust;


        function  init() {
            vm.searchStr="";
            vm.userId=$routeParams.uid;
            console.log(vm.userId);

        }init();
        vm.artistCount=0;


        vm.search = search;
        vm.getAlbumPage = getAlbumPage;
        vm.getArtistPage = getArtistPage;
        vm.addToPlaylist=addToPlaylist;

        function trust(url) {
            // var url = obj.tracks
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function getArtistPage(id,name){


        }

        function  addToPlaylist(songId,songName,artists,albumName) {
            console.log("add to playlist");
            UserService
                .addToPlaylist(songId,songName,artists,albumName,vm.userId)
                .then(function(result){
                    vm.message="Song added to your playlist";

                });


        }
        function search(str,criteria) {

            console.log("search ");
            console.log(str);
            MusicService
                .search(str,criteria)
                .then(
                    function(results) {
                        console.log("back in controller");

                        vm.searchResults=results;
                        console.log(vm.searchResults);


                    }

                );

        }

        function getAlbumPage(albumId) {

            console.log("get album page ");

            $location.url("/user/"+vm.userId+"/home/album/"+albumId) ;

        }
        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/"+vm.userId+"/home/artist/"+artistId) ;

        }





    }})();

