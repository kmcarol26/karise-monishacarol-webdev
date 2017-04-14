
(function () {
    angular
        .module("MusicApp")    //We have just one argument which means we are just reading and not declaring WebAppMaker here
        .config(configuration); //this config gets loaded at startup
    function configuration($routeProvider, $httpProvider) { //routeProvider is provided by the ngroute

       $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
       $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {   //when u see a #/login,fetch the templateUr user/login
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "HomeGuestController", //Name of Controller is LoginCOntroller
                controllerAs: "model" // Within the template, we can now refer to the controller as model
            })
            .when("/user/:uid/search", {
            templateUrl: "views/user/templates/search.view.client.html",
            controller: "SearchController",
            controllerAs: "model"
             })

            .when("/user/:uid/friends", {
             templateUrl: "views/user/templates/friends.view.client.html",
             controller: "FriendsController",
             controllerAs: "model"
            })
            .when("/user/home/album/:albumid", {
                templateUrl: "views/user/templates/album.view.client.html",
                controller: "AlbumController",
                controllerAs: "model"
            })
            .when("/user/home/artist/:artistId", {
                templateUrl: "views/user/templates/artist.view.client.html",
                controller: "ArtistController",
                controllerAs: "model"
            })


            .when("/login", {   //when u see a #/login,fetch the templateUr user/login
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController", //Name of Controller is LoginCOntroller
                controllerAs: "model" // Within the template, we can now refer to the controller as model
            })
            .when("/signup", {
                templateUrl: "views/user/templates/signup.view.client.html",
             controller: "SignUpController",
              controllerAs: "model"
            })


            .when("/user/home", {
                templateUrl: "views/user/templates/homepage.view.client.html",
                resolve:{
                    currentUser:checkLogin
                },
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/user/:uid/friends/:fid", {
                templateUrl: "views/user/templates/public-profile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                resolve:{
                    adminUser : isAdmin
                },

              controller: "AdminController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLogin
                }

            })
            .otherwise({
                redirectTo:'/login'
            }) ;



    }
    function isAdmin($q,UserService,$location) {
        var deferred=$q.defer();
        UserService
            .isAdmin()
            .then(function(user){
                if(user=='0'){
                    $location.url("/profile");
                    deferred.reject();


                }
                else{

                    deferred.resolve(user);
                }
            });
        return deferred.promise;

    }

    function checkLogin($q,UserService,$location) {
        var deferred=$q.defer();
        UserService
                .loggedin()
            .then(function(user){
                if(user=='0'){
                    deferred.reject();
                    $location.url("/login");

                }
            else{

                    deferred.resolve(user);
                }
            });
        return deferred.promise;

    }


})();

