 module.exports = function(app, model){

     app.get("/api/user",findUser);
     app.get("/api/user/:userId",findUserById);
     app.put("/api/user/:userId",updateUser);
     app.delete("/api/user/:userId",deleteUser);
     app.post("/api/user",createUser);

     function createUser(req,res){
         var user = req.body;

         console.log("client server creeate");
         model
             .userModel
             .createUser(user)
             .then(
                 function(newUser){
                     console.log("success");
                     console.log(newUser);
                     res.json(newUser);
                 },
                 function(error){
                     res.sendStatus(400).send(error);
                 }
             );

     }

    function findUser(req,res){

        var username= req.query.username;
        var password= req.query.password;
        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
    }

    function findUserByUsername(username,res){

        //var username=req.query['username'];

        model.userModel.findUserByUsername(username)
            .then(
                function (user,err){
                    if(user) {
                        console.log("SERVER");
                        res.json(user);

                    }
                    else{
                        console.log("else ");
                        res.sendStatus(400).send(err);
                    }
                    
                }

            );

    }



    function findUserByCredentials(req, res){
        var username= req.query.username;
        var password= req.query.password;
        model.userModel.findUserByCredentials(username,password)
            .then(
                function(users,error){
                    if(users){
                        res.json(users);
                    }
                    else{
                        res.sendStatus(400).send(error);
                    }
                }

            );

        }


    function findUserById(req, res){
        var userId=req.params.userId;
        console.log(userId);
        console.log("find user by id server");
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user){
                    console.log(user);

                        res.json(user);
                    },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateUser(req,res){
        var userId=req.params.userId;
        var newUser= req.body;
        model.userModel.updateUser(userId,newUser)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
        /*
        for (var u in users) {

            if (users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return; //to stop at first match
            }
        }
        return null;*/

    }
     function deleteUser(req,res){
         var userId=req.params.userId;
         var newUser= req.body;

         model.userModel.deleteUser(userId,newUser)
             .then(
                 function(){
                     res.send(200);

         },
                 function(){
                     res.sendStatus(400).send(error);
                 }
             );


     }

 }

