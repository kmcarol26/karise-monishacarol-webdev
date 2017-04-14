/**
 * Created by Monisha on 2/21/2017.
 */
module.exports=function(app)
{
 var model= require("./models/model.server.js")();
 require("./services/user.service.server")(app,model);
 require("./services/website.service.server")(app,model);
 require("./services/widget.service.server")(app,model);
 require("./services/page.service.server")(app,model);
};
