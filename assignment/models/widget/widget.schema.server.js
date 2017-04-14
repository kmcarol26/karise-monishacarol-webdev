/**
 * Created by Monisha on 3/20/2017.
 */
module.exports=function(){

    var mongoose = require("mongoose");
    var widgetSchema = mongoose.Schema(
        {
            order:Number,
            _page:{type:mongoose.Schema.Types.ObjectId,ref:"Page"},
            type:{type: String, enum :['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
            name:String,
            text:String,
            placeholder:String,
            description:String,
            url:String,
            width:String,
            height:String,
            rows:Number,
            size:Number,
            class:String,
            icon:String,
            deletable:Boolean,
            formatted:Boolean,
            dateCreated:{type:Date,default:Date.now}
        }
    );
    return widgetSchema;

};

