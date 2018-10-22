const mongoose = require('mongoose');
let dbURL = process.env.MONGOLAB_URI||'mongodb://localhost/movies'
mongoose.connect(dbURL);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected")
});

let movies = mongoose.Schema({
  id: {type: Number, unique:true, required:true},
  title: String,
  release_date: String,
  vote_average: Number,
  poster_path: String
})

let Movies = mongoose.model("Movies",movies)

const getAllFavorites = () =>{
  return Movies.find({})
};

const saveFavorite = (movie) =>{
  let newMovie = new Movies(movie)
  return newMovie.save()
};

const deleteFavorite = id => {
  return Movies.deleteOne({id})
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};