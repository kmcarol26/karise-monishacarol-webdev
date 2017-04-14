/**
 * Created by Monisha on 2/14/2017.
 */
/**
 * Created by Monisha on 2/9/2017.
 */
(function () {
    angular.module("WebAppMaker")
            .service("WidgetService", widgetService); //declates service UserService. userService is the constructor . UserService returns api

    function widgetService($http) {

        var api = {
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "createWidget": createWidget,
            "reorderWidget" : reorderWidget

        };
        return api;

        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.reorderWidget = reorderWidget;

        function createWidget(widget,pageId) {
            console.log("in create widget client");
            return $http.post("/api/page/"+pageId+"/widget",widget)
                .then(function(response){
                    return response.data;
                });
        }
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId)
                .then(function(response){
                    return response.data;
                });
        }
        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget")
                .then(function(response){
                    return response.data;
                });
        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId)
                .then(function(response){
                    return response.data;
                });
        }
        function updateWidget(widgetId, widget) {
            console.log("in update widget client");
             return $http.put("/api/widget/"+widgetId,widget)
                 .then(function(response){
                     return response.data;
                 });
        }
        function reorderWidget(pageId, start, end) {
            var url = "/page/"+pageId+"/widget?start=index1&end=index2";
            console.log("in reorder widget client");
            url=url.replace("index1",start).replace("index2",end);
            return $http.put(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();

