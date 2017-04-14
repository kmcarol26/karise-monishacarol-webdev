/**
 * Created by Monisha on 4/12/2017.
 */
/**
 * Created by Monisha on 4/7/2017.
 */
module.exports = function () {

    var model={};
    var q = require("q");
    var mongoose = require("mongoose");
    var SongSchema = require("./song.schema.server.js")();

    var SongModel = mongoose.model("SongModel",SongSchema);
    var api = {
        "addSong": addSong,
        "setModel":setModel,
       "removeSong": removeSong

    };
    return api;

    function removeSong(songId){
        var deferred =  q.defer();

        console.log(songId);

        console.log("delete song MODEL");
        SongModel.findOneAndRemove({
            _id : songId
        },function(err,song){
            if (err){

                console.log(err);
                deferred.reject(err);
            }
            else{
                console.log("success");
                deferred.resolve(song);}

        });

        return deferred.promise;
    }



    function addSong(song) {

        console.log("in song model add song");
        console.log(song);

        var deferred =  q.defer();

        SongModel
            .create(song, function(err, song){

                console.log("create model");
                if (err){
                    console.log(err);
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(song);}
            });
        return deferred.promise;
    }

/*
    function deleteSong(userId) {
        console.log("in user model delete");
        var deferred =  q.defer();
        // userModel.findByIdand
        SongModel.remove({ _id : userId},function(err,user){
            if (err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);}

        });

        return deferred.promise;

    }*/
    function setModel(_model) {
        model=_model;
    }

};

