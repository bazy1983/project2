module.exports = function(app){

    //test route -- remove later
    app.get("/api/student", function(req, res){
        res.send ("testing /student route")
    })


    app.get("/connect", function(req, res){

    })

}