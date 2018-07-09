// app.js

// IMPORTS --------------------------------------------------------------------
var express = require('express');
var app = express();
var db = require('./db');
var dns = require('dns');

// CONFIG ---------------------------------------------------------------------
app.set('view engine', 'ejs');
app.use(express.static(process.cwd() + '/public'));


// ROUTES ---------------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('index');
});



// HELPER FUNCTIONS -----------------------------------------------------------



// LISTENING ------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Serving on port ' + process.env.PORT);
});

