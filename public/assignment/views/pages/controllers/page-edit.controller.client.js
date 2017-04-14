/**
 * Created by Monisha on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        //event handlers
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;


        //assigning to vm makes the RHS available on the templates
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;


        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function(pages){
                            vm.pages=pages;
                            var page=PageService
                                        .findPageById(vm.pageId)
                                        .then(function(page){
                                                    vm.page=page;
                                                });
                });
        } init();

        function deletePage() {
            vm.pages=PageService
                        .deletePage(vm.pageId)
                        .then(function(){
                                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                                 });
        }

        function updatePage(page) {
            vm.pages=PageService
                        .updatePage(vm.pageId, page)
                        .then(function () {
                                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

                                });
                  }
    }

})();

