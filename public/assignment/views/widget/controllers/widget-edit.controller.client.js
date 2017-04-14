/**
 * Created by Monisha on 2/15/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)

    function WidgetEditController($sce, $routeParams, $location, WidgetService) {

        var vm = this;

        vm.doYouTrustUrl = doYouTrustUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.websiteId = $routeParams.wid;

       // vm.widgets = WidgetService.findAllWidgetsForPage(vm.pageId);

        function init() {
            console.log("inside edit controller");


                    WidgetService
                            .findWidgetById(vm.widgetId)
                            .then(function(widget){
                                console.log(widget);
                                vm.widget = widget;
                            });

        }

        init();

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function updateWidget(widget) {

            console.log("edit control");

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function(widget){
                    console.log(widget);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });

        }

        function deleteWidget() {

            vm.widgets=WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });

        }


    }


})();


