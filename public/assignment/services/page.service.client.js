/**
 * Created by Monisha on 2/14/2017.
 */

(function () {
    angular.module("WebAppMaker")
        .service("PageService", pageService); //declates service UserService. userService is the constructor . UserService returns api

    function pageService($http) {

        var api = {
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "createPage": createPage,
            "deletePage": deletePage,
            "updatePage": updatePage

        };return api;

        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.deletePage = deletePage;
        this.updatePage = updatePage;
        //api is a json map of the CRUD operations

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page)
                .then(function(response){
                    return response.data;
                });
        }
        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId)
                .then(function(response){
                    return response.data;
                });
        }
        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId,page)
                .then(function(response){
                    return response.data;
                });
        }
        function findAllPagesForWebsite(websiteId) {

            return $http.get("/api/website/"+websiteId+"/page")
                .then(function(response){
                    return response.data;
                });

        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();

