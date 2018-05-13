var path = require('path');

var app = express();

    //when user clicks button to /survey, get survey.html
    app.get('/', function(req, res) {
        res.sendFile( path.join( __dirname, "../public/index.html" ) );
    });