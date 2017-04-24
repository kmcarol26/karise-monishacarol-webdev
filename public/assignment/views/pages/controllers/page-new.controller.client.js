/**
 * Created by Monisha on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController)

    function PageNewController($routeParams, $location, PageService) {

        var vm = this;
        //event handlers
        vm.createPage = createPage;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
             PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function(pages){
                            vm.pages=pages;
                        });
        }init();

        function createPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .then(function(){
                            PageService
                                .findAllPagesForWebsite(vm.websiteId)
                                .then(function(pages){
                                            vm.pages=pages;
                                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                                        });

                            });
        }
    }

})();
