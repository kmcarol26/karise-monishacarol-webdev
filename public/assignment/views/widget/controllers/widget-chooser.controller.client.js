/**
 * Created by Monisha on 2/15/2017.
 */


(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController)

    function WidgetChooserController($sce, $routeParams, $location, WidgetService) {

        var vm = this;

        vm.doYouTrustUrl = doYouTrustUrl;
        vm.createWidget = createWidget;


        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        // vm.widgetId=$routeParams.wgid;
        vm.websiteId = $routeParams.wid;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .then(function(widgets){
                    vm.widgets=widgets;

        } )}init();
        function createWidget(widgetType){
            var newWidget = {};
            //newWidget._id = (new Date()).getTime();
            newWidget.type = widgetType;

                    WidgetService
                                 .createWidget(newWidget,vm.pageId)
                                 .then(function(widget){
                                     vm.widget=widget;
                                     console.log("controller back")
                                      console.log(vm.widget);

                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);

                                            });
            //vm.websites=WebsiteService.findWebsitesByUser(vm.userId);





        }
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

    }


})();



