const axios = require ('axios')
const { API_KEY } = require('../config.js');
var db = require('../postgres')
module.exports = {
  Query:{
    movies: (parent,args,context,info) => {
      let params = {
        api_key : API_KEY,
        language : 'en-US'
      }
      if(args.genre){
        params.with_genres = args.genre
      }
      return axios.get(`https://api.themoviedb.org/3/discover/movie`,{params})
      .then(res=>{
        const movies = res.data.results
        movies.forEach(movie=> movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
        return movies
      })
    },
    genres: () => {
      return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res=>res.data.genres)
    },
    favs: () => {
      return db.getAllFavorites().then(res=>res)
    }
  },
  Mutation: {
    movies: (parent, args) => {
      if(args.action === "save"){
        return db.saveFavorite(args)
      }else{
        return db.deleteFavorite(args.id)
      }
    }
  }
}