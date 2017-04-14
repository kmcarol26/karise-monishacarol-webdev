/**
 * Created by Monisha on 3/17/2017.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server.js")();
    var widgetModel = mongoose.model("widgetModel", widgetSchema);
    var api = {
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "deleteWidget": deleteWidget,
        "updateWidget": updateWidget,
        "createWidget": createWidget,
        "setModel": setModel,
        "reorderWidget": reorderWidget

    };
    return api;


    function reorderWidget(start, end, pageId) {
        return widgetModel
            .find({_page: pageId},
                function (err, widgets) {
                    widgets.forEach(function (widget) {
                        start=parseInt(start);
                        end=parseInt(end);
                        console.log("right place");
                        console.log(start);

                        //page.widgets.splice(end,0,widgets.splice(start,1)[0])
                        //page.save(function(
                        //pave.markModified('widget')

                        if(start< end){
                            if(widget.order === start){
                                console.log(widget.order);
                                widget.order = end;
                                widget.save();
                            }
                            else if(widget.order > start && widget.order <= end){
                                console.log("widget order check else");
                                console.log(widget);
                                widget.order--;
                                console.log(widget);
                                widget.save();
                                console.log(widget);
                            }
                        } else{
                            console.log("in else");
                            if(widget.order === start){

                                widget.order = end;
                                widget.save();

                            }

                            else if(widget.order < start && widget.order >= end){

                                widget.order++;

                                widget.save();

                            }
                        }

                        console.log(widgets);
                    });

                });
    }

    function deleteWidget(widgetId) {
        console.log("delete widget");

        return widgetModel.remove({
            _id : widgetId
        })

    }

    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id : widgetId});

    }

    function createWidget(widget,pageId) {
        widget._page = pageId;
        return widgetModel
            .find({_page: widget._page})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    console.log(widget);
                    return widgetModel.create(widget);
                },
                function (error) {
                    return null;
                });

    }

    function findAllWidgetsForPage(pageId){
        //var pageId=req.params.pageId;
        return widgetModel.find({"_page":pageId},
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
    function updateWidget(type,widget) {
        console.log("in widget model update");
        console.log(widget);
        if(widget.type==="HEADER") {
            return widgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text:widget.text,
                        size:widget.size,
                        name:widget.name
                    }
                )
        }
        else if(widget.type==="HTML") {
            return widgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text:widget.text
                    })
        }

        else if(widget.type==="IMAGE") {
            return widgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {

                        text :widget.text,
                        width :widget.width,
                        url :widget.url

                    })
        }

        else if(widget.type==="YOUTUBE") {
            return widgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    })
        }

        else if(widget.type==="INPUT") {
            console.log("in input if");
            return widgetModel
                .update(
                    {_id:widget._id},
                    {
                        text :widget.text,
                        rows :widget.rows,
                        placeholder :widget.placeholder,
                        formatted:widget.formatted
                    })

        }
    }
    function setModel(_model) {
        model=_model;
    }

}
