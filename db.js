// db.js

// IMPORTS --------------------------------------------------------------------
var mongoose = require('mongoose');
require('dotenv').load();


// CONFIG ---------------------------------------------------------------------
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.once('open', function() {
  console.log('Connected to remote db');
}).on('error', function(err){
  throw err;
});

// SCHEMAS --------------------------------------------------------------------
var exerciseSchema = new mongoose.Schema({
    description: String,
    duration: Number,
    date: String
});

var userSchema = new mongoose.Schema({
    username: String,
    exercises: [exerciseSchema]
});


// COLLECTIONS ----------------------------------------------------------------
var Exercise = mongoose.model('Exercise', exerciseSchema);
var User     = mongoose.model('User', userSchema);


// EXPORTS --------------------------------------------------------------------
module.exports = {
    storeUser: function(usernameForm, callback) {
        User.create({ username: usernameForm }, function(err, doc) {
            callback(err, doc);
        });
    },
    storeExerciseEntrie: function(data, callback) {
        Exercise.create({
            description: data.description,
            duration: Number(data.duration),
            date: data.date            
        }, function(err, exerciseDoc) {
           callback(err, exerciseDoc);
           
           User.findById(data.userid, function(err, userDoc) {
               if(err) throw err;
               else {
                   userDoc.exercises.push(exerciseDoc);
                   userDoc.save();
               }
           });
        });
    }
}