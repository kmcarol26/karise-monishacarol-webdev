/**
 * Created by Monisha on 4/7/2017.
 */
module.exports = function () {

    var model={};
    var q = require("q");
    var mongoose = require("mongoose");
    var PlaylistSchema = require("./playlist.schema.server.js")();

    var PlaylistModel = mongoose.model("PlaylistModel"  ,PlaylistSchema);
    var api = {
        "addSong": addSong,
        "deleteSong": deleteSong

    };
    return api;



    function addSong(song) {

        console.log("in playlist model add song");
        console.log(song);

        var deferred =  q.defer();

        UsersModel
            .create(user, function(err, user){

            console.log("create model");
            if (err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);}
        });
        return deferred.promise;
    }

    function deleteSong(userId) {
        console.log("in user model delete");
        var deferred =  q.defer();
        // userModel.findByIdand
        UsersModel.remove({ _id : userId},function(err,user){
            if (err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);}

        });

        return deferred.promise;

    }

};
function setModel(_model) {
    model=_model;
}
