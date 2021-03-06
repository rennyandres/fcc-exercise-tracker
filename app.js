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

app.post('/api/exercise/add', function(req, res) {
    db.storeExercise(req.body, function(err, doc) {
        if(err) throw err;
        else res.json(doc);
    })
});

app.get('/api/exercise/log',dateValidator, function(req, res) {
    if(!req.query.userId) res.send('userId is required');
    else {
        db.retriveUserLog(req.query, function(err, data) {
            if(err) throw err;
            else res.send(data);
        })
    }
})

// HELPER FUNCTIONS -----------------------------------------------------------
function dateValidator(req, res, next) {
    if(req.query.from || req.query.to) {
        if(new Date(req.query.from).toString() === 'Invalid Date'
            || new Date(req.query.to).toString() === 'Invalid Date') {
            res.json({
                'date [from & to]': 'Invalid date format. Follow yyyy/mm/dd'
            });
        }
        else {
            next();
        }          
    }
    else {
        next();
    }
}



// LISTENING ------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Serving on port ' + process.env.PORT);
});

