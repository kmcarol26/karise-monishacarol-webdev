/**
 * Created by Monisha on 3/30/2017.
 */
module.exports = function(app, model){

    console.log("model");
    var passport      = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    app.put('/api/user/removeSong',removeSong);

    app.post  ('/api/userlogin', passport.authenticate('local'), login);
    app.post  ('/api/loggedin', loggedin);
    app.get('/api/user/:userId/searchPeople/:name',searchPeople);
    app.get("/api/user",findUser);

    app.get("/api/user/:userId",findUserById);
    app.put('/api/user/follow',follow);
    app.put('/api/user/unfollow',unfollow);

    //app.get('/api/user/:userId/checkfollow',checkfollow);
    app.put("/api/user/:userId",checkSameUser,updateUser);
    app.delete("/api/user/:userId",checkSameUser,unregister);

    app.post("/api/user",checkSameUser,createUser);
    app.post('/api/logout',logout);
    app.post ('/api/signup',signUp);
    //ADMIN functions
    app.post ('/api/isAdmin',isAdmin);
    app.get ('/api/admin/user',findAllUsers);
    app.delete("/api/admin/:userId",checkAdmin,deleteUser);
    app.put("/api/admin/:userId",checkAdmin,editUser);
    app.post("/api/admin/newUser",checkAdmin,createNewUser);

    app.put('/api/addSong',addSong);
    app.get('/api/user/:userId/favorites',getFavorites);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

  //  console.log(process.env);



/*

 var googleConfig = {
 clientID     : "679837187557-0tud1fh0ifq82uvilpkaqquk9gou5m5j.apps.googleusercontent.com",
 clientSecret : "DN9wJe11sTdwUKFYR-R86WCK",
 callbackURL :"http://127.0.0.1:27017/google/callback"
 };

   */
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user/home',
            failureRedirect: '/project/#/login'
        }));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        model.
        UsersModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log(user);
                        console.log("if user");
                        return done(null, user);
                    } else {
                        console.log("else");
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.UsersModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    console.log("err");
                    console.log(err);
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    console.log("hi");
                    console.log(user);
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function getFavorites (req,res) {

        var userId=req.params.userId;
        model
            .UsersModel
            .getFavorites(userId)
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


    function addSong(req,res){
        var songId=req.body.songId;
        var song = req.body.song;
        var albumName=req.body.albumName;
        var artists=req.body.artists;
        var userId=req.body.userId;
        var newEntry={spotifyId:songId,song:song,artists:artists,albumName:albumName};

        console.log("server addSong");

        console.log(newEntry);
        console.log(userId);
        model
            .SongModel
            .addSong(newEntry)
            .then(
                function(newSong){
                    console.log("song success");
                 //   console.log(newSong);

                    model
                        .UsersModel
                        .addSong(userId,newSong._id)
                        .then(function(user){
                            console.log(" user success");
                            console.log(user);
                            //res.json(user);
                        });
                    res.json(newSong);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }



    function removeSong(req,res){

        console.log("server remove song");
       // var songId = req.body.songId;

     //   console.log("server songid"+songId);
       var  userId= req.user._id;
      //  console.log(req.params.songId);
        var songId=req.body;
        console.log("client server removeSong");
       // console.log(userId);
        model
            .UsersModel
            .removeSong(userId,songId)
            .then(
                function(song){
                    console.log("success");
                    console.log(song);
                    res.json(song);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function checkSameUser(req,res,next){
        console.log("check same user");
        console.log(req.user._id);
        console.log("params");
        console.log(req.params.userId);
        if(req.user && req.user._id == req.params.userId){

            console.log("success");
            next();
        }
        else{
            res.send(401);
        }
    }


    function checkAdmin(req,res,next){
        if(req.user && req.user.role == 'admin'){
            next();
        }
        else{
            res.send(401);
        }
    }
    function createNewUser(req,res){
        var user = req.body;

        model
            .UsersModel
            .createNewUser(user)
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
    function editUser(req,res){

        var userId=req.params.userId;
        var newUser= req.body;

        model
            .UsersModel
            .editUser(userId,newUser)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function unregister(req,res){

            model.UsersModel.deleteUser(req.params.userId, req.user)
                .then(
                    function () {
                        res.send(200);

                    },
                    function () {
                        res.sendStatus(400).send(error);
                    }
                );


    }




    function findAllUsers(req,res){
        if(req.user && req.user.role == 'admin') {
            model
                .UsersModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
        else{
            res.send(401);
        }

    }

    function isAdmin(req,res){
        res.send(req.isAuthenticated() && req.user.role == "admin" ? req.user : '0');

    }

    function loggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');

    }

    function uploadImage(req, res) {
        var myFile = req.file;
        console.log("file"+myFile);
        var filename = myFile.filename;
        console.log(filename);
        console.log(req.body);
        var userId=req.user._id;
        console.log("userid"+userId);
        var img = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
/*

        var newUser = {
            _id:req.body._id,
            img: req.protocol + '://' + req.get('host') + "/uploads/" + filename,
            username : req.body.username,
            password : req.body.password,
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            email    : req.body.email,
            gender   :req.body.gender,
            dob      :req.body.dob,
            role    : req.body.role,
            following :req.body.following,
            followers:req.body.followers,
            playlist:req.body.playlist,

            about:req.body.about,
            city:req.body.city,
            // websites : [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
            dateCreated : req.body.dateCreated
        };*/
        model.UsersModel.updateImage(userId, img).then(
            function (img) {
                res.redirect("/project/#/user/" +userId);
            }
            , function (err) {
                res.sendStatus(500).send(err);

            });
/*
        model
            .UsersModel
            .updateUser(newUser._id, newUser)
            .then(
                function (status) {
                    res.statusCode(200);
                  //  res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/"
                     //   + req.body.pageId + "/widget");
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );*/

    }


    function unfollow(req,res){
        console.log("unfollow server");
        var friendId=req.body.friendId;
        //      var friendId=req.body.friendId;
        console.log(friendId);
        var userId=req.body.userId;

        model
            .UsersModel
            .unfollow(userId,friendId)
            .then(
                function(user){
                    console.log("success");
                    console.log(user);
                    res.json(user);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function follow(req,res){
        console.log("follow server");
     var friendId=req.body.friendId;
  //      var friendId=req.body.friendId;
     console.log(friendId);
      var userId=req.body.userId;

        model
            .UsersModel
            .follow(userId,friendId)
            .then(
                function(user){
                    console.log("success");
                    console.log(user);
                    res.json(user);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }



    function searchPeople(req,res){

        console.log("server searchPeople");

        //var username=req.query['username'];
    //  var userId=req.params.userId;
        var name=req.params.name;
        model.UsersModel.searchPeople(name)
            .then(
                function (users,err){
                    if(users) {
                        console.log("SERVER");
                        res.json(users);

                    }
                    else{
                        console.log("else ");
                        res.sendStatus(400).send(err);
                    }

                }

            );

    }




    function signUp (req, res) {
        var user = req.body;

         var d = new Date(user.year,user.month, user.day,00,00,00);
         var newUser={firstName: user.firstName, lastName: user.lastName, email: user.email,username:user.username,
             password:user.password , dob : d ,gender: user.gender,role: user.role};

        //console.log(user);
        model.UsersModel
            .createUser(newUser)
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
                },
                function(err){
                    res.sendStatus(400).send(err);
                }
            );
    }

    function localStrategy(username, password, done) {
        model.UsersModel
            .findUserByCredentials(username, password)
            .then(

                function(user) {

                    if(user) {
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
        done(null,user);
    }

    function deserializeUser(user,done){
        model
            .UsersModel
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
        req.logout();
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

        model
            .UsersModel
            .createUser(user)
            .then(
                function(newUser){

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

        model.UsersModel.findUserByUsername(username)
            .then(
                function (user,err){
                    if(user) {

                        res.json(user);

                    }
                    else{

                        res.sendStatus(400).send(err);
                    }

                }

            );

    }



    function findUserByCredentials(req, res){
        var username= req.query.username;
        var password= req.query.password;
        model.UsersModel.findUserByCredentials(username,password)
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
        model
            .UsersModel
            .findUserById(userId)
            .then(
                function(user){

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

        model.UsersModel.updateUser(userId,newUser)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );


    }
    function deleteUser(req,res){
        var userId=req.params.userId;
        var newUser= req.body;


    model.UsersModel.deleteUser(userId, newUser)
        .then(
            function () {
                res.send(200);

            },
            function () {
                res.sendStatus(400).send(error);
            }
        );


    }

}

