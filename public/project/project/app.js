/**
 * Created by Monisha on 3/30/2017.
 */
module.exports=function(app)
{
    console.log("hi");
    var model= require("./models/models.server")();
    require("./services/user.service.server")(app,model);

};
