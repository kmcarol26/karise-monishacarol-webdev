/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function(){
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
        PageModel
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
        return  pageModel.remove({_id : pageId});
        }

    function findAllPagesForWebsite(websiteId) {
        return pageModel.find({"_website":websiteId},
            function(err, result){
                if(err){
                }
                if(result){
                    return result;
                }
                else{
                    return err;}
            });

    }

    function createPage(websiteId,page) {
        page._website=websiteId;
        return pageModel.create(page);

    }



    function findPageById(pageId) {
        return pageModel.findById(pageId);

    }

    function updatePage(pageId,page) {
        return pageModel.update(
            {
                _id : pageId
            },
            {
                name : page.name,
                description : page.description

            }
        )

    }


}
