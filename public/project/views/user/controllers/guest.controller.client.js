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
        .controller("HomeGuestController", HomeGuestController); // Instantiate a Controller called LoginController with constructor loginController

    function HomeGuestController($location, MusicService,UserService, $sce) { //injecting UserService

        console.log("Home contr ");
        var vm = this;
        vm.trust = trust;
        vm.search = search;
        vm.getAlbumPage = getAlbumPage;
        vm.getTopTracks=getTopTracks;
        vm.getArtistPage=getArtistPage;

        function init(){

            vm.searchFlag=true;
            getTopTracks();

        }init();

function getTopTracks () {
    MusicService
        .getTopTracks()
        .then(
            function(results) {
                console.log("back in controller");

                vm.topTracks=results;
               // vm.searchFlag=false;
              //  console.log(vm.searchResults);


            }

        );



}




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
                        vm.searchFlag=false;
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


