/**
 * Created by Monisha on 4/1/2017.
 */
(function () {
    angular
        .module("MusicApp")
        .factory("MusicService", MusicService);

    function MusicService($http) {
       // var artistCount=0;
        var api = {
            "search": search,
            "searchArtist":searchArtist,
            "getAlbumById":getAlbumById,
            "getArtistById":getArtistById,
            "getAlbumTracks":getAlbumTracks,
            "getAlbums":getAlbums,
            "getArtistInfo":getArtistInfo,
            "getTopTracks":getTopTracks

        };
        return api;

        function getTopTracks(){
            console.log("client top tracks");

            return $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=a75486041726cfdd96cfe551d541c255&format=json&limit=20")
                .then(function (response) {

                    console.log("successs");
                    return response.data;
                });
        }

        function getArtistInfo(name) {

            console.log("inside get artistINFO  by name");
            console.log(name);
            return $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+name+"&api_key=a75486041726cfdd96cfe551d541c255&format=json")
                .then(function (response) {

                    console.log("successs");
                    return response.data;
                });
        }




        function getArtistById(id) {

            console.log("inside get artist by id");
            return $http.get("https://api.spotify.com/v1/artists/" + id)
                .then(function (response) {

                    console.log("successs");
                    return response.data;
                });
        }


        function getAlbumById(id) {

            console.log("inside get album by id");
            return $http.get("https://api.spotify.com/v1/albums/" + id)
                .then(function (response) {

                    console.log("successs");
                    return response.data;
                });
        }
        function getAlbumTracks(id){

            console.log("inside get album tracks");
            return $http.get("https://api.spotify.com/v1/albums/"+id+"/tracks?limit=13")
                .then(function(response){

                    console.log("successs");
                    return response.data;
                });
        }
        function getAlbums(id){

            console.log("inside get albums for an artist");
            return $http.get("https://api.spotify.com/v1/artists/"+id+"/albums?album_type=album")
                .then(function(response){

                    console.log("successs");
                    return response.data;
                });
        }
        function searchArtist(str){

            console.log("inside search artist");
            return $http.get("https://api.spotify.com/v1/search?query="+str+"&type=artist&offset=0&limit=5")
                .then(function(response){

                    console.log("successs");
                    return response.data;
                });


        }
        function searchAlbum(str){

            console.log("inside search album");
            return $http.get("https://api.spotify.com/v1/search?query="+str+"&type=album&offset=0&limit=20")
                .then(function(response){

                    console.log("successs");
                    return response.data;
                });


        }
        function searchTrack(str){

            console.log("inside search track");
            return $http.get("https://api.spotify.com/v1/search?query="+str+"&type=track&offset=0&limit=20")
                .then(function(response){

                    console.log("successs");
                    return response.data;
                });


        }

        function search(str,criteria) {
            console.log("client servicce");
            console.log(str);
            if(criteria=="artist"){
                return searchArtist(str);
            }
            else if(criteria == "album"){
                return searchAlbum(str);
            }
            else if(criteria == "song"){
                return searchTrack(str);
            }



        }

    }
})();

