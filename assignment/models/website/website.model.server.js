/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var model = {};
    var q = require("q");
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
        var deferred =  q.defer();

        console.log("delete model website");
         websiteModel.remove({
            _id : websiteId
        },function(err,website){
             if (err){
                 deferred.reject(err);
             }
             else{
                 deferred.resolve(website);}

         });

        return deferred.promise;
    }

    function updateWebsite(websiteId,website){
        var deferred =  q.defer();
        console.log("in website model update");
         websiteModel.update(
            {
                _id : websiteId
            },
            {
                name : website.name,
                description : website.description

            }
        ) .then(function (website,err) {
             if(err){
                 deferred.reject(err);
             }
             else{
                 deferred.resolve(website);
             }

         });
        return deferred.promise;


    }
    function findWebsiteById(websiteId){
        var deferred =  q.defer();
         websiteModel.findById(websiteId,function ( err,website) {
             if(err){
                 //console.log(err);
                 deferred.reject(err);

             }

             else{
                 deferred.resolve(website);}


         });
        return deferred.promise;

    }

    function findWebsitesByUser(userId){
        var deferred =  q.defer();
         websiteModel.find({"_user":userId},
            function(err, result){
                if(err){
                    deferred.reject(err);
                }
                if(result){
                    deferred.resolve(result);
                }
               // else{
                //    return err;}
            });
        return deferred.promise;}


    function createWebsite(userId,website) {
        website._user=userId;
        var deferred =  q.defer();

         websiteModel.create(website, function(err, website){
             if (err){
                 deferred.reject(err);
             }
             else{
                 deferred.resolve(website);}
         });
        return deferred.promise;
    }

    function setModel(_model) {
        model=_model;
    }
}
