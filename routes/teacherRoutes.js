module.exports = function(app){

    //test route -- remove later
    app.get("/api", function(req, res){
        res.send ("testing /app route")
    })

    //teacher login route
    app.get("/teacherLogin", function(req, res){
        console.log(req.query)
        let username = "keely",
            password = "12345",
            userID = 1;

            if (req.query.username === username && req.query.password === password){
                res.send({id: userID})
            } else {
                res.send ({message : "either user id or password is incorrect"})
            }
    })

    
}