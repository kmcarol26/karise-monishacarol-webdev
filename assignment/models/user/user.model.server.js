module.exports = function () {

    var model={};
    var q = require("q");
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server.js")();

    var userModel = mongoose.model("userModel"  ,userSchema);
    var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "setModel":setModel
        };
        return api;

        function findUserByUsername(username) {
            console.log("in user model find by username");
            var deferred =  q.defer();
            userModel.findOne({username:username},
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

        function updateUser(userId, newUser) {
            console.log("in user model update");
            var deferred =  q.defer();
             userModel.update(
                {
                    _id : userId
                },
                {
                    firstName : newUser.firstName,
                    lastName : newUser.lastName
                }
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
            console.log("in user model find by id");
            var deferred =  q.defer();
            console.log(userId);
             userModel.findById(userId,function ( err,user) {
                 if(err){
                     //console.log(err);
                     deferred.reject(err);

                 }

                 else{
                     deferred.resolve(user);}


             });
            return deferred.promise;
        }
        function findUserByCredentials(username, password) {
            console.log("in user model find by creds");
            var deferred =  q.defer();
            userModel.findOne({
                username : username,
                password : username
            },
                function(err,user){
                if(err){
                    deferred.reject(err);

                }

                else{
                    deferred.resolve(user);}
                }

            );
            return deferred.promise;
        }
        function createUser(user) {
            console.log("in user model create");
            var deferred =  q.defer();

             userModel.create(user, function(err, user){
                 if (err){
                     deferred.reject(err);
                 }
                 else{
                    deferred.resolve(user);}
             });
             return deferred.promise;
        }

        function deleteUser(userId) {
            console.log("in user model delete");
            var deferred =  q.defer();
           // userModel.findByIdand
            userModel.remove({ _id : userId},function(err,user){
                if (err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(user);}

            });

            return deferred.promise;

        }

};
function setModel(_model) {
    model=_model;
}