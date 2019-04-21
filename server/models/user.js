// With mongoose we have the avenue the establish a connection to our MongoDB server
// With mongoose we can define schemas, we can save instances to MongoDB, we can find items from databse
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// We create a schema for our user
var userSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  image_profile: { type: String, required: true },
  description: { type: String, required: false },
  age: { type: Number, required: true, min: 18, max: 65 },
  theme_color: { type: String, required: true, enum: ['RED', 'BLACK', 'WHITE'] },
  react_score: { type: Number, required: true, min: 0, max: 10},
  angular_score: { type: Number, required: true, min: 0, max: 10},
  git_score: { type: Number, required: true, min: 0, max: 10},
  birth_date: { type: Date, required: true},
  is_married: { type: Number, required: true},
});

// next step is to compile it
// A modal is class with which we construct a document
// In our case, each document will be user with properties and behaviors as declared in our schema
var Model = mongoose.model('User', userSchema);
module.exports = Model;
