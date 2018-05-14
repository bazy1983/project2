var path = require("path");

module.exports = function(app){

    //root route renders and sends student view 
    app.get("/", function(req, res){
        res.render("student")
    })

    //session route renders and sends session route
    app.get("/dashboard", function(req, res){
        res.render("teacher")
    })


    //testing purposes only
    app.get("/test", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/test/index.html"));
      });
}
