(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            //TODO: complete the CRUD functions
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login":login,
            "logout": logout,
            "register":register
        };
        return api;
/*
        function register(user) {
            return $http.post("/api/register", user);
        }*/
        function login(user){
            console.log("in user client");
            console.log(user);

            return $http.post("/api/login",user)
                .then(function(response){
                    return response.data;
                });
        }
        function logout(user) {
            return $http.post("/api/logout");
        }


        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then(function(response){
                    return response.data;
                });
        }
        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser)
                .then(function(response){
                    response.data;
                });
        }
        function findUserById(userId) {
            console.log("find user by id client server");
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
            return $http.delete('/api/user/' + userId)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();
