(function () {
    angular
        .module("MusicApp")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "loggedin":loggedin,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login":login,
            "logout": logout,
            "signUp":signUp,
            "addToPlaylist":addToPlaylist,
            "searchFriends":searchFriends,
            "follow":follow,
            "unfollow":unfollow,
            "checkFollowing":checkFollowing,
            "isAdmin":isAdmin,
            "findAllUsers":findAllUsers,
            "unregister":unregister,
            "editUser":editUser,
            "createNewUser":createNewUser,
            "removeSong":removeSong,
            "getFavorites":getFavorites
        };
        return api;

        function removeSong(songId){

            console.log("client remove song");
            console.log(songId);
            // var obj={userId:userId,songId:songId};
            return $http.put('/api/user/removeSong',songId)
                .then(function(response){
                    return response.data;
                });

        }


        function getFavorites(userId){
            console.log("client get fav");
            return $http.get('/api/user/'+userId+'/favorites')
                .then(function(response){
                    return response.data;
                });

        }



        function createNewUser(user){

            return $http.post('/api/admin/newUser',user)
                .then(function(response){
                    return response.data;
                });

        }

        function editUser(user){

            return $http.put('/api/admin/' + user._id,user)
                .then(function(response){
                    return response.data;
                });

        }
        function unregister(userId){
            return $http.delete('/api/user/' + userId)
                .then(function(response){
                    return response.data;
                });
        }

        function findAllUsers(){
            return $http.get("/api/admin/user")
                .then(function(response){
                    console.log("find all users");
                    return response.data;
                });
        }

        function isAdmin(){
            return $http.post("/api/isAdmin")
                .then(function(response){
                    console.log(response.data);
                    return response.data;
                });
        }

function loggedin(){
    return $http.post("/api/loggedin")
        .then(function(response){
            console.log(response.data);
            return response.data;
        });
}
function checkFollowing(userId,friendId){

    var ids={userId:userId,friendId:friendId};

    return $http.get("/api/user/"+userId+"/checkfollow",ids)
        .then(function(response){
            console.log("check follow success client");
            console.log(response.data);
            return response.data;
        });
}

function follow(userId,friendId){
    console.log("follow client");

    var ids={userId:userId,friendId:friendId};


    return $http.put("/api/user/follow",ids)
        .then(function(response){
            console.log("follow success client");
            console.log(response.data);
            return response.data;
        });


}


        function unfollow(userId,friendId){
            console.log("unfollow client");

            var ids={userId:userId,friendId:friendId};


            return $http.put("/api/user/unfollow",ids)
                .then(function(response){
                    console.log("unfollow success client");
                    console.log(response.data);
                    return response.data;
                });


        }
        function searchFriends(userId,name) {
            console.log("findU friends");
            console.log(name);

            return $http.get("/api/user/"+userId+"/searchPeople/"+name)
                .then(function(response){
                    console.log("back client");
                    return response.data;
                });
            /*
            return $http.get("/api/user/"+userId+"/people")
                .then(function(response){
                    return response.data;
                });*/
        }
function addToPlaylist(songId,songName,artists,albumName,userId){


    console.log("in add playlist client");

    console.log(songId);
    var playlistData={userId: userId,songId:songId,song:songName,artists:artists,albumName:albumName};

    return $http.put("/api/addSong",playlistData)
        .then(function(response){
            return response.data;
        });


}
        function login(user){
            console.log("in user client");
            console.log(user);

            return $http.post("/api/userlogin",user)
                .then(function(response){
                    console.log(response.data);
                    return response.data;

                });
        }
        function logout(user) {
            return $http.post("/api/logout");
        }


        function signUp(user) {
            console.log("user client");
            return $http.post("/api/signup", user)
                .then(function(response){
                    console.log("client success");
                    return response.data;
                });

        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then(function(response){
                    return response.data;
                });
        }
        function updateUser(user) {
            return $http.put("/api/user/"+user._id, user)
                .then(function(response){
                    console.log(response.data);
                   return response.data;
                });
        }
        function findUserById(userId) {
            console.log("findUserByIdclient server");
            console.log(userId);
            return $http.get("/api/user/"+userId)
                .then(function(response){
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            console.log("client servicce");
            return $http.get("/api/user?username="+username+"&password="+password)
                .then(function(response){
                    return response.data;
                });
        }
        function createUser(user) {
            console.log("client create");
            console.log(user);
            return $http.post("/api/user",user)
                .then(function(response){
                    return response.data;
                });
        }
        function deleteUser(userId) {
            return $http.delete('/api/admin/' + userId)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();
