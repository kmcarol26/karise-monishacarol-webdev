/**
 * Created by Monisha on 3/20/2017.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var pageSchema = mongoose.Schema(
        {
            _website : {type : mongoose.Schema.ObjectId, ref:'websiteModel'},
            name : String,
            title : String,
            description : String,
            dateCreated : {type:Date , default : Date.now()},
            widgets : {type : mongoose.Schema.ObjectId, ref:'widgetModel'}

        }
    );
    return pageSchema;
}
