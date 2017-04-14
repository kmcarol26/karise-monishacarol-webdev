/**
 * Created by Monisha on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        //var vm=this;
        //assigning to vm makes the RHS available on the templates
        var vm = this;
        //event handlers
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;


        function init() {
            console.log(vm.websiteId);
            var websites =  WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(websites){
                    vm.websites = websites;
                   var website= WebsiteService
                        .findWebsiteById(vm.websiteId)
                        .then(function(website){
                            console.log("in");
                            vm.website=website;
                        }

                       );

                   //console.log(vm.websites);
                });



        }

        init();

        function deleteWebsite(website) {
            vm.websites=WebsiteService
                .deleteWebsite(vm.websiteId,website)
                .then(function(){
                    $location.url("/user/" + vm.userId + "/website");
                                    })
            //vm.websites=WebsiteService.findWebsitesByUser(vm.userId);


        }

        function updateWebsite(website) {
            vm.websites=WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function(){
                    $location.url("/user/" + vm.userId + "/website");

                });
            //vm.websites=WebsiteService.findWebsitesByUser(vm.userId);


        }


    }


})();
