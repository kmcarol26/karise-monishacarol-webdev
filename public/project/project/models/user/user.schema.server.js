/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username : {type:String,require:true},
        password : {type:String},
        firstName: String,
        lastName : String,
        email    : String,
        gender   :String,
        dob      :{type: Date},
        role    : {type:String , enum: ['admin','user'],default:'user'},
        following :[String],
        followers:[String],
       // playlist:[],
        favorites : [{type: mongoose.Schema.Types.ObjectId, ref:'SongModel'}],
        img:String,
        about:String,
        city:String,
        google:{
            id:String,
            token:String
        },
       // websites : [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated : {type: Date, default : Date.now}

    }, {collection: 'project.users'});
    return UserSchema;

};
