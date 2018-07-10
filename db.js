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
    user: mongoose.Schema.Types.ObjectId,
    description: String,
    duration: Number,
    date: Date
});

var userSchema = new mongoose.Schema({
    username: String,
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
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
    storeExercise: function(data, callback) {
        Exercise.create({
            user: data.userid,
            description: data.description,
            duration: Number(data.duration),
            date: new Date(data.date)            
        }, function(err, exerciseDoc) {
           callback(err, exerciseDoc);
           
           User.findById(data.userid, function(err, userDoc) {
               if(err) throw err;
               else {
                   userDoc.exercises.push(exerciseDoc._id);
                   userDoc.save();
               }
           });
        });
    },
    retriveUserLog: function(data, callback) {
        Exercise.find({ user: data.userId })
        .select('-_id -user -__v')
        .where('date')
            .gt(new Date(data.from || '1970/01/01'))
            .lt(new Date(data.to || Date.now()))
        .limit(Number(data.limit))
        .exec(function(err, result) {
            callback(err, result);
        });            
    }
}