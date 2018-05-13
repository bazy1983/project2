
module.exports = function(app){

    //root route renders and sends student view 
    app.get("/", function(req, res){
        res.render("student")
    })

    //session route renders and sends session route
    app.get("/dashboard", function(req, res){
        res.render("teacher")
    })
}
