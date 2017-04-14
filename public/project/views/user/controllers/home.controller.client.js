/**
 * Created by Monisha on 4/14/2017.
 */
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
        .controller("HomeController", HomeController); // Instantiate a Controller called LoginController with constructor loginController

    function HomeController($location, MusicService,UserService, $sce) { //injecting UserService

        console.log("Home contr ");
        var vm = this;
        vm.trust = trust;

        function init(){

        vm.searchFlag=false;

        }init();



        vm.search = search;
        vm.getAlbumPage = getAlbumPage;

        vm.addToPlaylist=addToPlaylist;

        function trust(url) {
            // var url = obj.tracks
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
                        console.log("back in controller");

                        vm.searchResults=results;
                        vm.searchFlag=true;
                        console.log(vm.searchResults);


                    }

                );

        }

        function getAlbumPage(albumId) {

            console.log("get album page ");

            $location.url("/user/home/album/"+albumId) ;

        }
        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/home/artist/"+artistId) ;

        }





    }})();


