 module.exports = function(app, model){
     var passport      = require('passport');
     var cookieParser = require('cookie-parser');
     var session = require('express-session');
     var auth = authorized;
     var LocalStrategy = require('passport-local').Strategy;


     app.post  ('/api/login', passport.authenticate('local'), login);
     app.get("/api/user",findUser);
     app.get("/api/user/:userId",findUserById);
     app.put("/api/user/:userId",updateUser);
     app.delete("/api/user/:userId",deleteUser);
     app.post("/api/user",createUser);
     app.post('/api/logout', logout);
     app.post ('/api/register', register);

     app.use(session({
         secret: 'this is the secret',
         resave: true,
         saveUnitialized: true
     }));
     app.use(cookieParser());
     app.use(passport.initialize());
     app.use(passport.session());
     passport.use(new LocalStrategy(localStrategy));
     passport.serializeUser(serializeUser);
     passport.deserializeUser(deserializeUser);

     function register (req, res) {
         var user = req.body;
         model.userModel
             .createUser(user)
            .then(
             function(user){
                 if(user){
                     req.login(user, function(err) {
                         if(err) {
                             res.status(400).send(err);
                         } else {
                             res.json(user);
                         }
                     });
                 }
             }
         );
     }

     function localStrategy(username, password, done) {
         model.userModel
             .findUserByCredentials(username, password)
             .then(
                 function(user) {
                     if(user.username === username && user.password === password) {
                         return done(null, user);
                     } else {
                         return done(null, false);
                     }
                 },
                 function(err) {
                     if (err) { return done(err); }
                 }
             );
     }


     function serializeUser(user, done) {
         console.log("in serialize user");
         done(null,user);
     }

     function deserializeUser(user,done){
         console.log("in deserialize user");
         model
             .userModel
             .findUserById(user._id)
             .then(
                 function (user) {
                     done(null, user);
                 },
                 function (err) {
                     done(err, null);
                 }
             );
     }



     function login(req,res){
         var user=req.user;
         res.json(user);

     }

     function logout(req, res) {
         req.logOut();
         res.send(200);
     }

     function authorized (req, res, next) {
         if (!req.isAuthenticated()) {
             res.send(401);
         } else {
             next();
         }
     }

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

