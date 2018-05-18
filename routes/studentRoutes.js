var db = require("../models")
module.exports = function(app){

    //test route -- remove later
    app.get("/api/student", function(req, res){
        res.send ("testing /student route")
    })

    app.get("/studentLogin", function(req, res){
        console.log(req.query)
        db.user.findOne({
            where : {
                username : req.query.username,
                password : req.query.password
            }
        })
        .then(function(data){
            res.status(200).send(data);
        })
        .catch(function(err){
            console.log("selecting one student failed");
            console.log(err)
        })
    })

    app.get("/connect", function(req, res){
        console.log(req.query)
    })

}