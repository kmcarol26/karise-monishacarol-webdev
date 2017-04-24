/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server.js")();
    var websiteModel = mongoose.model("websiteModel",websiteSchema);
    var api = {
        "setModel" : setModel,
        "findWebsitesByUser": findWebsitesByUser,
        "findWebsiteById": findWebsiteById,
        "createWebsite": createWebsite,
        "deleteWebsite": deleteWebsite,
        "updateWebsite": updateWebsite

    }
    return api;


    function deleteWebsite(websiteId){

        console.log("delete model website");
        return websiteModel.remove({
            _id : websiteId
        })
    }

    function updateWebsite(websiteId,website){
        console.log("in website model update");
        return websiteModel.update(
            {
                _id : websiteId
            },
            {
                name : website.name,
                description : website.description

            }
        )


    }
    function findWebsiteById(websiteId){
        return websiteModel.findById(websiteId);

    }

    function findWebsitesByUser(userId){
        return websiteModel.find({"_user":userId},
            function(err, result){
                if(err){
                }
                if(result){
                    return result;
                }
                else{
                    return err;}
            });}


    function createWebsite(userId,website) {
        website._user=userId;

        return websiteModel.create(website);
    }

    function setModel(_model) {
        model=_model;
    }
}
