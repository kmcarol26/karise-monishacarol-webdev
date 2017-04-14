/**
 * Created by Monisha on 3/30/2017.
 */
(function () {
   var app= angular
        .module("MusicApp", ["ngRoute"]);
    var albumName = {};
    app.service("myService", function() {

        albumName.setter = function(newValue) {
            albumName.value = newValue;
        }
        albumName.getter = function() {
            return albumName.value;
        }
        return albumName;
    });

})();


