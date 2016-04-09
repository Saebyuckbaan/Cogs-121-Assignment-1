var Mongoose = require('mongoose');


var MessageSchema = new Mongoose.Schema({
  // fields are defined here
  "email": String,
  "content": String,
  "created" : Date
});


exports.Message = Mongoose.model('Message', MessageSchema);