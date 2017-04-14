/**
 * Created by Monisha on 4/7/2017.
 */
/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var PlaylistSchema = mongoose.Schema({
        name : String,
        songs : [{type: mongoose.Schema.Types.ObjectId, ref:'SongModel'}]

    });
    return PlaylistSchema;

};
