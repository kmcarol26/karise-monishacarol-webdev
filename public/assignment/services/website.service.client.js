/**
 * Created by Monisha on 2/9/2017.
 */
(function(){
    angular.module("WebAppMaker")
        .service("WebsiteService",websiteService); //declates service UserService. userService is the constructor . UserService returns api

    function websiteService($http) {
        var websites = [{ "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite

        };
        return api;

        this.findWebsitesByUser= findWebsitesByUser;
        this.findWebsiteById= findWebsiteById;
        this.createWebsite= createWebsite;
        this.deleteWebsite= deleteWebsite;
        this.updateWebsite= updateWebsite;

        function createWebsite(userId,website) {
            return $http.post("/api/user/"+userId+"/website", website)
                .then(function(response){
                    return response.data;
                });
        }
        function deleteWebsite(websiteId,website) {
            return $http.delete("/api/website/"+websiteId, website)
                .then(function(response){
                    return response.data;
                });
        }
        function updateWebsite(websiteId,website) {
            return $http.put("/api/website/"+websiteId, website)
                .then(function(response){
                    return response.data;
                });
        }
        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website")
                .then(function(response){
                    return response.data;
                });
        }
        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();
