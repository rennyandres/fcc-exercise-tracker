// app.js

// IMPORTS --------------------------------------------------------------------
var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

// CONFIG ---------------------------------------------------------------------
app.set('view engine', 'ejs');
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES ---------------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/api/exercise/new-user', function(req, res) {
    db.storeUser(req.body.username, function(err, result) {
        if(err) throw err;
        else res.json(result);
    });
});


// HELPER FUNCTIONS -----------------------------------------------------------



// LISTENING ------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Serving on port ' + process.env.PORT);
});

