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
        vm.signUp=signUp;
        vm.login=login;
        vm.logout=logout;
        vm.checkLoggedIn=checkLoggedIn;
        vm.addToPlaylist=addToPlaylist;
        vm.searchFriends=searchFriends;
        vm.getFavorites=getFavorites;

        function init(){


            vm.searchFlag=false;
           // vm.logged=false;

           // vm.user=currentUser;
           // vm.userId=currentUser._id;
            vm.init = true;
            checkLoggedIn();
           // checkFavorites();
            getTopTracks();


        }init();

        function getFavorites(userId){

            console.log("inside hget fav");

            UserService
                .getFavorites(userId)
                .then(
                    function (response) {

                        console.log(response);
                        vm.favorites=response.favorites;
                        var idList=[];
                        for (i=0;i<vm.favorites.length;i++){
                            idList.push(vm.favorites[i].spotifyId);
                            console.log(vm.favorites[i].spotifyId);
                        }
                        vm.spotifyIdList=idList;
                        console.log(vm.spotifyIdList);
                    });

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
            vm.criteria1=criteria;

            console.log("search ");
            console.log(str);
            MusicService
                .search(str,criteria)
                .then(
                    function(results) {
                        console.log("back in controller");

                        vm.searchFlag=true;

                        console.log(vm.searchFlag);
                        //location.reload();

                        vm.searchResults=results;

                        console.log(vm.searchResults);




                    }

                );



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
                        vm.user=user;
                        vm.userId=user._id;
                        console.log(vm.logged);
                        getFavorites(vm.userId);
                    }
                });


        }

        function logout(){
            UserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
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
                            $location.url("/");
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
                            console.log("success");

                            //  var user = response.data;

                            $rootScope.currentUser = user;
                            $location.url("/");
                        }
                    },

                    function () {
                        console.log("fail");
                        vm.error = "no such user";
                        console.log(vm.error);

                    }




                );




        }

function getTopTracks () {
    MusicService
        .getTopTracks()
        .then(
            function(results) {
                console.log("back in controller");

                vm.topTracks=results;
               //vm.searchFlag=false;
                console.log(vm.topTracks);


            }

        );



}




        function trust(url) {
            // var url = obj.tracks
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }


        function getAlbumPage(albumId) {

            console.log("get album page ");

            $location.url("/user/home/album/"+albumId) ;

        }
        function getArtistPage(artistId) {

            console.log("get artist page ");

            $location.url("/user/home/artist/"+artistId) ;

        }
        function  addToPlaylist(songId,songName,artists,albumName) {
            console.log("add to playlist");
            UserService
                .addToPlaylist(songId,songName,artists,albumName,vm.userId)
                .then(function(result){
                    vm.message="Song added to your playlist";
                    getFavorites(vm.userId);

                });


        }






    }})();


