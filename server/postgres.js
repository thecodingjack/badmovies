const { Client } = require('pg')
const config = require ('./config')

const client = new Client(config)

client.connect()
  .then(()=>console.log('psql connected'))
  .catch(err=>console.error(err.stack))

const getAllFavorites =  () => {
  let queryStr = `select * from movies`
  return client.query(queryStr).then(res=>res.rows)
};

const saveFavorite = function(movie) {
  let queryStr = `insert into movies values ($1,$2,$3,$4,$5) RETURNING *`
  params = [movie.id,movie.title,movie.release_date,movie.vote_average,movie.poster_path]
  return client.query(queryStr,params).then(res=>res.rows[0])
};

const deleteFavorite = function(id) {
  let queryStr = `delete from movies where movies.id=${id} RETURNING *`
  return client.query(queryStr).then(res=>res.rows[0])
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};