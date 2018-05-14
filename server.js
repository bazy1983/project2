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
app.use(express.static(__dirname +  "public"))

//express handlebars express extension to render handlebars partials
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//requiring all the routes

//api routes
require("./routes/apiRoutes")(app);

//html routes
require("./routes/htmlRoutes")(app);



//db.sequelize.sync()
// .then(function() {
//     app.listen(PORT, function() {
//       console.log("App listening on PORT " + PORT);
//     });
//   });

var server = app.listen(port, function(){
    console.log("Server is listening on port " + port)
})

var io = socket(server);


//socket.io connection to emit and listen to keywords
io.on("connection", function(socket){
    console.log("client connected to socket ID: ", socket.id);

    // socket.on("someKeyword", function(data){
    //     io.emit("someOtherKeyword", data)
    // })
    socket.on('disconnect', function () {
        //io.emit('user disconnected');
      });
})