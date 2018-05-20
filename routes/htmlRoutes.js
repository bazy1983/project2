var path = require("path");
var db = require("../models")

module.exports = function(app){

    //root route renders and sends student view 
    app.get("/", function(req, res){
        // renders student  using / route
        res.render("student")
    })

    //session route renders and sends session route
    app.get("/dashboard", function(req, res){
        // renders teacher partial using dashboard route 
        res.render("teacher")
    })


    //testing purposes only
    app.get("/test", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/test/index.html"));
      });

    app.get("/:secret/:id", function(req, res){
        db.test.findOne({
            where : {
                id : req.params.id,
                secret_key : req.params.secret
            }
        })
        .then(function(data){
            db.question.findAll({
                where: {
                    id : data.question_ids
                }
            })
            .then(function(questionData){
                console.log(data)
                console.log(questionData)
                let test = {
                    testId : data.id,
                    userId : data.userId,
                    questions : questionData
                }
                res.render("quiz", test)
            })
            .catch(function(err){
                console.log("internal error happened while getting all questions");
                console.log(err)
            })
        })
        .catch(function(err){
            console.log("secret and id combination do not match");
            console.log(err)
            res.status(404).end()
        })
    })
}
