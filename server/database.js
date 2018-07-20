const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  let queryStr = `select * from movies`
  connection.query(queryStr,(err,results)=>{
    if(err) callback (err)
    else callback(null,results)
  })
};

const saveFavorite = function(movie,callback) {
  // save movie to favorites in the database
  let queryStr = `insert into movies values (?,?,?,?,?)`
  params = [movie.id,movie.title,movie.release_date,movie.vote_average,movie.poster_path]
  connection.query(queryStr,params,(err,results)=>{
    if(err) callback (err)
    else callback(null,results)
  })
};

const deleteFavorite = function(id,callback) {
  let queryStr = `delete from movies where movies.id=${id}`
  connection.query(queryStr,(err,results)=>{
    console.log(err)
    if(err) callback (err)
    else callback(null,results)
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};