var env = process.env.NODE_ENV || 'development',
    config = require('./config')[env],
    mongoose = require('mongoose');

module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db, { useNewUrlParser: true });
    mongoose.connection.on('error', function (err) {
        console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
    }).on('open', function () {
        console.log('Connection extablised with MongoDB')
    })
    return db;
};
/*
mongoose.connect('mongodb://localhost/graphql1', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var kittySchema = new mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence 1' });
  console.log(silence.name);
  // console.log(silence.speak());

  silence.save(function (err, fluffy) {
    if (err) return console.error(err);
    silence.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

});
*/
