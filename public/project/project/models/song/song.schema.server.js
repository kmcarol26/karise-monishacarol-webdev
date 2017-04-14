/**
 * Created by Monisha on 4/12/2017.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var SongSchema = mongoose.Schema({
        song : String,
        albumName:String,
        artists : {type:Array,"default":[]}

    }, {collection: 'project.songs'});
    return SongSchema;

};