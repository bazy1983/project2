var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var socket = require("socket.io");
var db = require('./models')
var port = process.env.PORT || 3000; //host server port or local 3000 port

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //set extended to true to prevent stripping objects

// parse application/json
app.use(bodyParser.json())

//serve static client css and js files
app.use(express.static("public"))

//express handlebars express extension to render handlebars partials
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//requiring all the routes
//=============================

//teacher api routes
require("./routes/teacherRoutes")(app);

//student api routes
require("./routes/studentRoutes")(app);

//html routes
require("./routes/htmlRoutes")(app);


db.sequelize.sync()


var server = app.listen(port, function(){
    console.log("Server is listening on port " + port)
})

var io = socket(server);

var clients = 0;
//socket.io connection to emit and listen to keywords
io.on("connection", function(socket){
    // console.log("client connected to socket ID: ", socket.id);
    // clients ++;
    // console.log("people connected to server: "+ clients)

    //listening to teacher socket and emit to student using teacher session id
    socket.on("teacherSocket", function(teacherData){
        //console.log(teacherData.sessionID);
        io.emit(teacherData.sessionID, teacherData)
    })

    //listening for the end of session
    socket.on("end", function(endData){
        console.log(endData)
        io.emit(endData, "end of session")
    })

    //listening to student socket and emit to teacher using student session id
    socket.on("studentSocket", function(studentData){
        //change emit keywork on the fly to target a session
        console.log(studentData)
        io.emit(studentData.sessionId, studentData )

    })

    socket.on('disconnect', function () {
       // clients--;
        //console.log("people connected to server: "+ clients)
        //io.emit('user disconnected');
      });
})