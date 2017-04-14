/**
 * Created by Monisha on 3/30/2017.
 */
module.exports = function(){

    console.log("model.server.js");
    var UsersModel = require("./user/user.model.server.js")();
    var SongModel = require("./song/song.model.server.js")();

    var model={
        UsersModel : UsersModel,
        SongModel : SongModel

    };

    UsersModel.setModel(model);
    SongModel.setModel(model);
    return model;


};