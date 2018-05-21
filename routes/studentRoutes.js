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
            if(data)res.send(data);
        })
        .catch(function(err){
            console.log("selecting one student failed");
            console.log(err)
        })
    })

    app.get("/connect", function(req, res){
        console.log(req.query)
    })

    app.post("/storeStudentAnswers", function(req, res){
        console.log(req.body)
        db.test_result.create({
            teacherId : req.body.teacherId,
            userId : req.body.userId,
            session_id : req.body.session_id,
            student_result : req.body.student_result
        })
        .then(function(){
            res.status(201).end()
        })
        .catch(function(err){
            console.log("saving student results unsuccessful");
            console.log(err)
        })
    })
}