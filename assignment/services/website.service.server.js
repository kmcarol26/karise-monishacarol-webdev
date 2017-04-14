/**
 * Created by Monisha on 2/24/2017.
 */
module.exports =  function (app,model){
    app.get('/api/user/:userId/website',findWebsitesByUser);
    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/website/:websiteId',findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);



    function deleteWebsite(req,res){
        var websiteId=req.params.websiteId;

        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function(){
                res.sendStatus(200);
            },function(error){
                res.sendStatus(400).send(error);
            })
    }

    function updateWebsite(req,res){
        var website=req.body;
        var websiteId=req.params.websiteId;
        model
            .websiteModel
            .updateWebsite(websiteId,website)
            .then(function(){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(400).send(error);
            })


    }
    function findWebsiteById(req,res){
        var websiteId=req.params.websiteId;
       // console.log(websiteId);
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function(website){
                res.json(website);
            },function(error){
                res.sendStatus(400).send(error);
            });



    }

    function findWebsitesByUser(req,res){
        var userId= req.params.userId;

        model
            .websiteModel
            .findWebsitesByUser(userId)
            .then(function(websites){
                res.json(websites);
            },
            function (error) {
               res.sendStatus(400).send(error);
            });
    }
    function createWebsite(req,res) {

         var userId= req.params.userId;
         var website = req.body;
         model
             .websiteModel
             .createWebsite(userId,website)
             .then(function(newWebsite){
                 console.log(newWebsite);
                 res.json(newWebsite);
             },function(error){
                 res.sendStatus(400).send(error);
             });
             }

};
