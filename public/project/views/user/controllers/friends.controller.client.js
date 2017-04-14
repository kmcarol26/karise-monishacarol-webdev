/**
 * Created by Monisha on 4/8/2017.
 */
/**
 * Created by Monisha on 4/4/2017.
 */

(function () {

    angular
        .module("MusicApp")
        .controller("FriendsController", FriendsController); // Instantiate a Controller called LoginController with constructor loginController

    function FriendsController($location, MusicService,UserService,$scope,$routeParams,myService,$sce) { //injecting UserService

        console.log("ArtistController");
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
            // console.log(vm.artistName);


        }init();



        function trust(url) {
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function getArtistInfo(artistName){
            console.log("info");
            console.log(artistName);
            MusicService
                .getArtistInfo(artistName)
                .then(
                    function(results) {
                        console.log("back in controller");
                        vm.artistInfo=results.artist.bio.content;
                        console.log(results);


                    }

                );
        }

        function getArtistById(artistId) {
            console.log("get artist by Id ");
            console.log(artistId);
            MusicService
                .getArtistById(artistId)
                .then(
                    function(results) {
                        console.log("back in controller");
                        vm.artist=results;
                        // console.log(vm.artist);
                        vm.artistName=results.name;
                        console.log(vm.artistName);
                        vm.getArtistInfo=getArtistInfo(vm.artistName);

                    }

                );

        }

        function searchFriends(str) {
            console.log("search friends ");
            console.log(str);
            UserService
                .searchFriends(vm.userId,str)
                .then(
                    function(results) {

                        console.log(results);
                        console.log("back in ALBUM controller ");

                        vm.people=results;
                        console.log(vm.people);
                    },function(err){
                        console.log("err");
                    }

                );

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


        function getAlbums(artistId) {
            console.log("get albums ");
            console.log(artistId);
            MusicService
                .getAlbums(artistId)
                .then(
                    function(results) {
                        console.log("back in controller");

                        vm.albums=results;
                        console.log(vm.albums);

                    }

                );

        }
        function getAlbumPage(albumId) {

            console.log("get album page ");

            $location.url("/user/"+vm.userId+"/home/album/"+albumId) ;

        }


    }})();

