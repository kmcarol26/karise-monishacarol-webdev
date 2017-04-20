
(function () {

    angular
        .module("MusicApp")
        .controller("HomeController", HomeController); // Instantiate a Controller called LoginController with constructor loginController

    function HomeController($location, MusicService,UserService, $sce) { //injecting UserService

        var vm = this;
        vm.trust = trust;
        vm.search = search;
        vm.getAlbumPage = getAlbumPage;
        vm.checkLoggedIn=checkLoggedIn;
        vm.addToPlaylist=addToPlaylist;

        function init(){

            vm.searchFlag=false;
            vm.logged=false;


        }init();


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

                        vm.searchResults=results;
                        vm.searchFlag=true;

                    }

                );

        }

        function getAlbumPage(albumId) {

            $location.url("/user/home/album/"+albumId) ;

        }
        function getArtistPage(artistId) {

            $location.url("/user/home/artist/"+artistId) ;

        }

    }})();


