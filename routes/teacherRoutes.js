var db = require("../models")

module.exports = function(app){

    //test route -- remove later
    app.get("/api/teacher", function(req, res){
        res.send("testing /teacher route")
    })

    //teacher login route
    app.get("/teacherLogin", function(req, res){
        db.user.findOne({
            where : {
                username : req.query.username,
                password : req.query.password
            }
        })
        .then(function(data){
            if(data){
                 if(data.dataValues.role_id < 3){ // admin or teacher
                     let user = {
                         firstName : data.dataValues.first_name,
                         lastName : data.dataValues.last_name,
                         id : data.dataValues.id
                     }
                     res.send(user)
                     
                 } else {
                     res.status(403).send("Unauthorized Access")
                 } 
            } else {
                res.status(404).send ({message : "either user id or password is incorrect"})
            }
        })
        .catch(function(err){
            console.log("fetching teacher info went wrong")
            console.log(err)
        })

    })

    //Teacher registation
    app.post("/teacherSignUp", function(req, res){
        let authCode = "19AZ" //authorization code required to register teacher
        if (req.body.token === authCode){
            db.user.create(req.body)
            .then(function(data){
                console.log(data);
                res.send(data)
            })
            .catch(function(err){
                console.log("creating new teacher failed")
            })
        } else {
            console.log(req.body)
            res.send("Wrong Token")
        }


    })

    //request for all tests created by teacher
    app.get("/teacherTests/:teacherId", function(req, res){
        console.log(req.params)
        // query test table using teacher's id
        db.test.findAll({
            where : {
                userId : req.params.teacherId
            }
        })
        .then(function(data){
            //remove these console.log on deployment
            console.log("All tests created by teacher");
            console.log (data);
            res.send(data)
        })
        .catch(function(err){
            console.log("getting all tests created by teacher failed");
            console.log(err)
        })
    });

    //get all questions for selected test
    app.get("/testQuestions", function(req, res){
        console.log(req.query)
        //query question table using question id
    });

    //posting session id to be used as keys for socket.io
    app.post("/sessionId", function(req, res){
        console.log(req.body)
        res.status(200).end();
    });

    //send 
    app.post("/question", function(req, res){
        console.log(req.body);
        //emit a socket with question data to student view
        res.status(200).end();
    })

    //a marker from teacher's view to indicate the end of the quiz
    app.get("/end", function(req, res){
        //emit a socket to student view 

        res.status(200).end();
    })
}