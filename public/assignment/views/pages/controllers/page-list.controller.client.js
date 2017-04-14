/**
 * Created by Monisha on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
                    PageService
                        .findAllPagesForWebsite(vm.websiteId)
                        .then(function(pages){
                                    vm.pages=pages;
                                });
                       /* .error(function () {
                    console.log("error");
                });*/

        } init();
       // var website = PageService.updatePage();

    }


})();

