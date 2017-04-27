(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.reorderWidget=reorderWidget;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            console.log("hi");
                        WidgetService
                            .findAllWidgetsForPage(vm.pageId)
                            .then(function(widgets){
                    vm.widgets=widgets;
                    //console.log(vm.widgets);
                    console.log("inside widget controller");
                                console.log(vm.widgets);
                    });} init();

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function doYouTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function reorderWidget(start, end) {
            console.log("reorder"+start+ "  " + end);
            WidgetService
                .reorderWidget(vm.pageId , start, end)
                .then(
                    function (response) {
                        console.log("geting called");
                        console.log(response);
                        //vm.widgets=response;
                        // init();
                    });
        }
    }
})();
