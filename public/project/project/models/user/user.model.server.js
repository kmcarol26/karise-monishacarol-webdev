module.exports = function () {

    var model={};
    var q = require("q");
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server.js")();

    var UsersModel = mongoose.model("usersModel"  ,userSchema);
    var SongModel = mongoose.model("songModel"  ,userSchema);
    var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "setModel":setModel,
             "addSong":addSong,
             "searchPeople":searchPeople,
                "follow":follow,
            "unfollow":unfollow,
        "findAllUsers":findAllUsers,
        "editUser":editUser,
        "createNewUser":createNewUser,
        "getFavorites" :getFavorites,
        "findUserByGoogleId":findUserByGoogleId,

       "removeSong":removeSong,
        "updateImage":updateImage
//        "checkFollowing":checkFollowing
        };
        return api;

        function updateImage(userId,img){
            var deferred =  q.defer();
             UsersModel.update(
                {
                    _id: userId
                },
                {
                    img:img
                },function (err, user) {
                if (err) {
                    console.log(err);
                    deferred.resolve(user);
                }
                else {
                    console.log("success");
                    console.log(user);

                    deferred.resolve(user);


                }
            });
            return deferred.promise;
        }

    function removeSong(userId,songId) {
        console.log(userId);
        console.log(songId);
        console.log("in user model deleteSONG");
        var deferred =  q.defer();
      // var sid= mongoose.Types.ObjectId('songId');
       //console.log("sid"+sid);
        // userModel.findByIdand
        UsersModel.findByIdAndUpdate(
             userId,
            {$pull: {"favorites" : {_id:songId}}},
            { safe: true, upsert: true },

            function(err,song){
                if (err){
                    console.log(err);
                    deferred.reject(err);
                }
                else{
                    console.log(song);
                    console.log("delete success");
                    deferred.resolve(song);}

            });

        return deferred.promise;

    }

        function findUserByGoogleId(googleId){

            var deferred =  q.defer();

            UsersModel.findOne({'google.id' : googleId},function (err, user) {
                if (err) {
                    console.log(err);
                    deferred.resolve(user);
                }
                else {
                    console.log("success");
                    console.log(user);

                    deferred.resolve(user);


                }
            });
            return deferred.promise;



        }
/*
        function removeSong(userId,songId){

            console.log("in user model removeSong");
            console.log(songId);
            console.log(userId);
            var deferred =  q.defer();

            UsersModel.findOneAndUpdate(
                {_id: userId},
                {$pull: {playlist : {_id:songId}}},
                {safe: true},
                function (err,user) {
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }

                });
            return deferred.promise;


        }
*/
        function createNewUser(user){


            var deferred =  q.defer();

            UsersModel.create(user, function(err, user){

                console.log("create model");
                if (err){
                    console.log("err"+err);
                    deferred.reject(err);
                }
                else{
                    console.log("success in model");
                    console.log(user);
                    deferred.resolve(user);}
            });
            return deferred.promise;

        }
function editUser(userId,user){

    console.log("in admin model update");
    var deferred =  q.defer();
    UsersModel.update(
        {
            _id : userId
        },

    { $set:user}


    )
        .then(function (user,err) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }

        });
    return deferred.promise;
}


        function findAllUsers(){


                var deferred = q.defer();
                UsersModel
                    .find({}, function (err, user) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(user);
                        }
                    });
                return deferred.promise;



        }

    function unfollow(userId,friendId){
        console.log("model unfollow");
        var deferred =  q.defer();

        UsersModel.update(

            {_id: userId},
            {$pull: {following: friendId}},
            {safe: true},
           // {safe: true, upsert: true,new:true},
            function (err,user) {
                if(user){


                    UsersModel.update(
                        {_id: friendId},
                        {$pull: {followers: userId}},
                        {safe: true},
                        function (err,user) {
                            if(err){
                                deferred.reject(err);


                            }
                            else{
                                deferred.resolve(user);
                            }

                        });
                }
                else{
                    deferred.reject(err);




                }

            });
        return deferred.promise;


    }



        function follow(userId,friendId){
            console.log("model follow");
            var deferred =  q.defer();

            UsersModel.findOneAndUpdate(

                {_id: userId},
                {$push: {following: friendId}},
                {safe: true, upsert: true,new:true},
                function (err,user) {
                    if(user){


                        UsersModel.findOneAndUpdate(
                            {_id: friendId},
                            {$push: {followers: userId}},
                            {safe: true, upsert: true,new:true},
                            function (user,err) {
                                if(err){
                                    deferred.resolve(user);

                                }
                                else{
                                    deferred.reject(err);
                                }

                            });
                    }
                    else{
                        deferred.reject(err);


                    }

                });
            return deferred.promise;


        }

    function searchPeople(str){

        var deferred =  q.defer();
        UsersModel.find({firstName:{
                $regex: new RegExp(str, "ig")
            }},
            function(err, user){
                if(err){
                    console.log(err);
                    deferred.reject(err);
                }
                else{
                    console.log("else");
                    console.log(user);
                    deferred.resolve(user);
                }}
        );
        return deferred.promise;

    }

    function getFavorites(userId){

        console.log("in user model getfav");
      //  console.log(songId);
        console.log(userId);
        var deferred = q.defer();

        UsersModel
            .findById({ _id:userId })
            .populate('favorites')
            .exec(function (err, user) {
                if (err)  deferred.reject();

                else{

                    console.log('The creator is');

                    console.log(user);
                    deferred.resolve(user);

                }
                // prints "The creator is Aaron"
            });
        return deferred.promise;

    }

    function addSong(userId,songId) {

        console.log("in user model addSong");
        console.log(songId);
        console.log(userId);
        var deferred = q.defer();

        UsersModel
            .findById({_id:userId}, function (err, user) {
                user.favorites.push(songId);
                user.save();

                deferred.resolve(user);
            })
            ;
        return deferred.promise;

        //var id=new  Date().getTime();;
        /*
         var newSong={
         _id:id,
         song:song.song,
         albumName:song.albumName,
         artists:song.artists

         }*/
    }





        function findUserByUsername(username) {
            var deferred =  q.defer();
            UsersModel.findOne({username:username},
                function(err, user){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(user);
            }}
        );
        return deferred.promise;
        }

        function updateUser(userId,user) {

            var deferred =  q.defer();
            UsersModel.update(
                {
                    _id : userId
                },

                { $set:user}


            )
                .then(function (user,err) {
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }

                });
            return deferred.promise;

        }


        function findUserById(userId) {
            var deferred =  q.defer();
           // console.log(userId);
            UsersModel.findById(userId,function ( err,user) {
                 if(err){
                     deferred.reject(err);

                 }

                 else{
                     deferred.resolve(user);}


             });
            return deferred.promise;
        }
        function findUserByCredentials(username, password) {
            var deferred =  q.defer();
            UsersModel.findOne({
                username : username,
                password : username
            },
                function(err,user){
                if(err){
                    console.log(err);
                    deferred.reject(err);

                }

                else{

                    console.log(user);
                    deferred.resolve(user);}
                }

            );
            return deferred.promise;
        }
        function createUser(user) {


            console.log(user);

           // var d = new Date(user.year,user.month, user.day,00,00,00);
          //  user={firstName: user.firstName, lastName: user.lastName, email: user.email,username:user.username,
           //     password:user.password , dob : d ,gender: user.gender,role: user.role}

           // console.log(user);
            var deferred =  q.defer();

            UsersModel.create(user, function(err, user){

                 if (err){
                     deferred.reject(err);
                 }
                 else{
                    deferred.resolve(user);}
             });
             return deferred.promise;
        }

        function deleteUser(userId) {
            var deferred =  q.defer();
           // userModel.findByIdand
            UsersModel.remove({ _id : userId},function(err,user){
                if (err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(user);}

            });

            return deferred.promise;

        }
    function setModel(_model) {
        model=_model;
    }
};
