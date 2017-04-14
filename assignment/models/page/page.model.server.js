/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
    var q = require("q");
    var model = {};
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server.js")();
    var pageModel = mongoose.model("pageModel",pageSchema);

    var api = {
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "createPage": createPage,
        "deletePage": deletePage,
        "updatePage": updatePage,
        "setModel": setModel,
        "addWidget" : addWidget,
        "reorderWidgets": reorderWidgets
    };return api;

    function reorderWidgets(){
        var deferred = q.defer();
        page.widgets.splice(end,0,widgets.splice(start,1)[0]);
        page.save(function(page,err){
            if(page){
                deferred.resolve(page);
            }
            else{
                deferred.reject(err);
            }
        });
      //  pave.markModified('widget');

    }

    function addWidget(pageId){
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, page) {
                page.widgets.push(pageId);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;

    }
    function setModel(_model) {
        model=_model;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.remove({_id : pageId},function (page,err) {
            if(err){
                deferred.reject();
            }
            else{
                deferred.resolve(page);
            }

        });
        return deferred.promise;
        }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
         pageModel.find({"_website":websiteId},
            function(err, result){
                if(err){
                    deferred.reject();
                }
                if(result){
                   deferred.resolve(result);
                }
               // else{
                   // return err;}
            });
         return deferred.promise;

    }

    function createPage(websiteId,page) {
        console.log("model");
        console.log(page);
        var deferred = q.defer();
        page._website=websiteId;
         pageModel.create(page,function (page,err) {
             if(err){
                 console.log(err);
                 deferred.abort();
             }
             else{
                 console.log("success");
                 deferred.resolve();
             }

         });
        return deferred.promise;

    }



    function findPageById(pageId) {
        var deferred = q.defer();
         pageModel.findById(pageId,function (page,err) {
             if(err){
                 deferred.reject();
             }
             else{
                 deferred.resolve(page);
             }

         });
        return deferred.promise;

    }

    function updatePage(pageId,page) {
        var deferred = q.defer();
         pageModel.update(
            {
                _id : pageId
            },
            {
                name : page.name,
                description : page.description

            }
        )  .then(function (page,err) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }

        });
        return deferred.promise;


    }


}
