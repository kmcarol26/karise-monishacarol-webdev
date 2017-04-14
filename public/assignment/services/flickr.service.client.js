/**
 * Created by Monisha on 2/14/2017.
 */
/**
 * Created by Monisha on 2/9/2017.
 */
(function () {
    angular.module("WebAppMaker")
            .service("FlickrService", FlickrService ); //declates service UserService. userService is the constructor . UserService returns api

    function FlickrService ($http) {

        var api = {
            "searchPhotos": searchPhotos ,
                    };
        return api;

        this.searchPhotos  = searchPhotos ;

        function searchPhotos (searchTerm) {
            var key = "af76aaf8e8de5819a07d1c37172011ea";
            var secret ="1ca1d5b57af2ac5f";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();
