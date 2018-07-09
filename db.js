// db.js

// IMPORTS --------------------------------------------------------------------
var mongoose = require('mongoose');


// CONFIG ---------------------------------------------------------------------
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.once('open', function() {
  console.log('Connected to remote db');
}).on('error', function(err){
  throw err;
});

// SCHEMAS --------------------------------------------------------------------



// COLLECTIONS ----------------------------------------------------------------



// EXPORTS --------------------------------------------------------------------
module.exports = {
     
}