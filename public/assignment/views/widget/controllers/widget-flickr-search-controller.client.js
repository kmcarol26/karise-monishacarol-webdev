/**
 * FlickrImageSearchController
 * Created by Monisha on 3/22/2017.*/

(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)

    function FlickrImageSearchController($sce, $routeParams, $location, FlickrService, WidgetService) {

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.websiteId = $routeParams.wid;
        console.log("controller");

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

    function searchPhotos(searchTerm) {

            console.log("controller");
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    console.log("sucess");
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }),function(err){
                console.log(err);
            };}

        function selectPhoto(photo) {
        console.log("phto");
        console.log(photo);
            var widget={};
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);


            widget._id= vm.widgetId;
            widget.type = "IMAGE";
            widget._page = vm.pageId;
            widget.url = url;
            console.log("HJVHJVHJB JN");
            console.log(widget.url);



            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function(widget){
                    console.log(widget);
                    $location.url("/user/"+vm.userId+"/website/" + vm.websiteId + "/page/" +vm.pageId + "/widget/" +vm.widgetId);
                });
        }














    }


})();


