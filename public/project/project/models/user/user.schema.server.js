/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username : {type:String,required:true},
        password : {type:String},
        firstName: String,
        lastName : String,
        email    : String,
        gender   :String,
        dob      :{type: Date},
        role    : {type:String , enum: ['admin','user'],default:'user'},
        following :[{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        followers:[{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
       // playlist:[],
        favorites : [{type: mongoose.Schema.Types.ObjectId, ref:'SongModel'}],
        img:{type:String },
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
