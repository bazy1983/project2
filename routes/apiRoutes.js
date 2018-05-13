module.exports = function(app){

    //test route -- remove later
    app.get("/api", function(req, res){
        res.send ("testing /app route")
    })
}