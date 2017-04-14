/**
 * Created by Monisha on 2/24/2017.
 */

module.exports = function(app,model){
    app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
    app.post('/api/website/:websiteId/page',createPage);
    app.get('/api/page/:pageId',findPageById);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId',deletePage);

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (page,err) {
                    if(page)
                    {
                        res.json(page);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

        });}

    function findAllPagesForWebsite(req,res) {

        var websiteId=req.params.websiteId;

        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (page,err) {
                    if(page)
                    {
                        console.log("find page by website server s");
                        res.json(page);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

                });

    }

    function createPage(req,res) {

        var websiteId=req.params.websiteId;
        var page = req.body;
        console.log("new");

        console.log("server create page");
        model
            .pageModel
            .createPage(websiteId,page)
            .then(function(page){
                console.log("success SERER");
                if(page){
                    console.log("success SERER");
                    res.json(page);

                }
                else{
                    res.sendStatus(400);
                }

           },function(err){
                console.log("fail SERER");
                res.sendStatus(400).send(error);
            });



    }



    function findPageById(req,res) {
        var pageId=req.params.pageId;
        console.log("find page by id server");
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    console.log(page);

                    res.json(page);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updatePage(req,res) {
        var pageId=req.params.pageId;
        var page=req.body;

        model
            .pageModel
            .updatePage(pageId,page)
            .then (function () {
            res.sendStatus(200);
        },
        function(error){
            res.sendStatus(400).send(error);
        }
    );

    }

}
