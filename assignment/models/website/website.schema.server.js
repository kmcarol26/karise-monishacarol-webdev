/**
 * Created by Monisha on 3/20/2017.
 */
module.exports=function(){

    var mongoose = require("mongoose");
    var websiteSchema = mongoose.Schema(
        {
            _user : {type: mongoose.Schema.ObjectId , ref : "userModel"},
            name : String,
            developerId : String,
            description : String,
            pages : {type: mongoose.Schema.ObjectId , ref : "pageModel"} ,
            dateCreated  : {type: Date, default : Date.now}
        }
    );
    return websiteSchema;

};
