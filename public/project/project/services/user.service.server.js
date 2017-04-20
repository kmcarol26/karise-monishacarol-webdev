/**
 * Created by Monisha on 3/30/2017.
 */
module.exports = function(app, model){

    console.log("server");

    var bcrypt = require("bcrypt-nodejs");
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    app.post('/api/project/login',passport.authenticate('local'), login);
    var auth = authorized;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.put('/api/user/removeSong',removeSong);
    app.post  ('/api/project/loggedin', loggedin);
    app.get('/api/user/:userId/searchPeople/:name',searchPeople);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put('/api/user/follow',follow);
    app.put('/api/user/unfollow',unfollow);
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

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

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

                        return done(null, user);

                    } else {

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

                    if (err) { return done(err);

                    }
                }
            )
            .then(
                function(user){

                    return done(null, user);

                },
                function(err){

                    if (err) {
                        return done(err);
                    }
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


        model
            .SongModel
            .addSong(newEntry)
            .then(
                function(newSong){

                    model
                        .UsersModel
                        .addSong(userId,newSong._id)
                        .then(function(user){

                        });

                    res.json(newSong);
                },
                function(error){

                    res.sendStatus(400).send(error);

                }
            );

    }



    function removeSong(req,res){

        var  userId= req.user._id;
        var songId=req.body.songId;

        model
            .UsersModel
            .removeSong(userId,songId)
            .then(
                function(song){

                    res.json(song);

                },
                function(error){

                    res.sendStatus(400).send(error);

                }
            );
    }

    function checkSameUser(req,res,next){

        if(req.user && req.user._id == req.params.userId){

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

        model
            .UsersModel
            .deleteUser(req.params.userId, req.user)
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
        var filename = myFile.filename;
        var userId=req.user._id;
        var img = req.protocol + '://' + req.get('host') + "/uploads/" + filename;

        model
            .UsersModel
            .updateImage(userId, img)
            .then(
            function (img) {

                res.redirect("/project/#/user/" +userId);

            }
            , function (err) {

                res.sendStatus(500).send(err);

            });

    }


    function unfollow(req,res){

        var friendId=req.body.friendId;
        var userId=req.body.userId;

        model
            .UsersModel
            .unfollow(userId,friendId)
            .then(
                function(user){

                    res.json(user);

                },
                function(error){

                    res.sendStatus(400).send(error);

                }
            );

    }

    function follow(req,res){

        var friendId=req.body.friendId;
        var userId=req.body.userId;

        model
            .UsersModel
            .follow(userId,friendId)
            .then(
                function(user){

                    res.json(user);

                },
                function(error){

                    res.sendStatus(400).send(error);

                }
            );

    }



    function searchPeople(req,res){

        var name=req.params.name;
        model
            .UsersModel
            .searchPeople(name)
            .then(
                function (users,err){
                    if(users) {

                        res.json(users);

                    }
                    else{

                        res.sendStatus(400).send(err);
                    }

                }

            );

    }




    function signUp (req, res) {

        var user = req.body;
        var d = new Date(user.year,user.month, user.day,00,00,00);
        var newUser={firstName: user.firstName, lastName: user.lastName, email: user.email,username:user.username,
            password:bcrypt.hashSync(user.password) , dob : d ,gender: user.gender,role: user.role};

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

        model
            .UsersModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log('------------------');
                    console.log(user);
                    // if(user && bcrypt.compareSync(password, user.password)) {
                    if(username && bcrypt.compareSync(password, user.password)){
                        console.log(user);
                        return done(null, user);
                    } else {
                        console.log("didnt find user");
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        console.log(err);
                        return done(err); }
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

        console.log("inside login");
        console.log("project");

        var user=req.user;
        console.log(user);
        res.send(user);

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

