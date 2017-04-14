/**
 * Created by Monisha on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        //var vm=this;
        //assigning to vm makes the RHS available on the templates
        var userId = $routeParams.uid;

        //assigning to vm makes the RHS available on the templates

        var vm = this;
        vm.userId = userId;
        //event handlers
        vm.createWebsite = createWebsite;
        function init(){
            WebsiteService
                .findWebsitesByUser(userId)
                .then(function(websites){
                    vm.websites = websites;
                });

        }init();


        function createWebsite(website,userId) {
            var website=WebsiteService.
                createWebsite(userId, website);
            vm.websites=WebsiteService.findWebsitesByUser(vm.userId);
            console.log(vm.websites);

            $location.url("/user/" + vm.userId + "/website");


        }


    }


})();
