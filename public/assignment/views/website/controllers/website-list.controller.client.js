/**
 * Created by Monisha on 2/11/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;

        function init(){

            WebsiteService
                .findWebsitesByUser(userId)
                .then(function(websites){

                    vm.websites = websites;
                    console.log("hi");
                    console.log(vm.websites);
                });

        }init();
       //var website = WebsiteService.updateWebsite();


    }


})();
