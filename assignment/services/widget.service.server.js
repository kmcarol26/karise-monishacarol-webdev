/**
 * Created by Monisha on 2/24/2017.
 */
module.exports =  function (app,model) {
    //var multer = require('multer'); // npm install multer --save
   // var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget',createWidget);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put("/page/:pid/widget",reorderWidget);


    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        console.log(start);
        var end =  parseInt(req.query.end);
        console.log(end);

         console.log("in reorder widget server");

        model.widgetModel
            .reorderWidget( start, end, pageId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }
    function uploadImage(req, res) {
        var myFile = req.file;

        console.log(req.body);
        var filename = myFile.filename;

        var newWidget = {
            url: req.protocol + '://' + req.get('host') + "/uploads/" + filename,
            type:"IMAGE",
            _id: req.body.widgetId,
            width:req.body.width
        };

        model
            .widgetModel
            .updateWidget(newWidget.type, newWidget)
            .then(
                function (status) {
                    res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/"
                        + req.body.pageId + "/widget");
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );

    }

    function deleteWidget(req,res) {
        console.log("delete widget");
        var widgetId=req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(function(widget){
                res.json(widget);
            },function(err){
                res.sendStatus(400).send(err);
            })

    }

    function findWidgetById(req,res) {
         var widgetId=req.params.widgetId;
         console.log("findwidgetbyid");
         console.log(widgetId);
         model
             .widgetModel
             .findWidgetById(widgetId)
             .then(function(widget){
                 res.json(widget);
             },function(err){
                 res.sendStatus(400).send(err);
             });
    }

    function createWidget(req,res) {
        var pageId=req.params.pageId;
        var widget=req.body;
        console.log("client server creeate");
        console.log(widget);
        model
            .widgetModel
            .createWidget(widget,pageId)
            .then(
                function(widget){
                    console.log("create widget success");
                    res.json(widget);
                },
                function(error){
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findAllWidgetsForPage(req,res){
        var pageId=req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets){
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }
    function updateWidget(req, res) {

        var widget=req.body;

        console.log("MONSIHA");
        console.log(widget);
        var widgetType=widget.type;
        model
            .widgetModel
            .updateWidget(widgetType,widget)
            .then(function(widget){
                console.log("update");
                  //  console.log(widget);
                    res.send(widget);
                },
                function(error){
                console.log(error);
                    res.sendStatus(400).send(error);
                })
    }

}
