var {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList
} = require('graphql');

var axios = require('axios')
const { API_KEY } = require('../server/config.js');
var db = require('./postgres')

const MoviesType = new GraphQLObjectType({
  name: 'Movies',
  fields:{
    id: {type: GraphQLInt},
    poster_path: {type: GraphQLString},
    title: {type: GraphQLString},
    release_date: {type: GraphQLString},
    vote_average: {type: GraphQLString},
  }
})

const FavsType = new GraphQLObjectType({
  name: 'Favs',
  fields:{
    id: {type: GraphQLInt},
    poster_path: {type: GraphQLString},
    title: {type: GraphQLString},
    release_date: {type: GraphQLString},
    vote_average: {type: GraphQLString},
  }
})

const GenresType = new GraphQLObjectType({
  name: 'Genres',
  fields:{
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  }
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movies:{
      type: new GraphQLList(MoviesType),
      args: {genre: { type: GraphQLString } },
      resolve(parentValue, args){
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
      }
    },
    genres:{
      type: new GraphQLList(GenresType),
      resolve(){
        return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res=>res.data.genres)
      }
    },
    favs:{
      type: new GraphQLList(FavsType),
      resolve(){
        return db.getAllFavorites().then(res=>res)
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields:{
    movies:{
      type: MoviesType,
      args: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        poster_path: { type: GraphQLString },
        vote_average: { type: GraphQLString },
        release_date: { type: GraphQLString },
        action: { type: GraphQLString },
      },
      resolve(parentValue,args){
        if(args.action === "save"){
          return db.saveFavorite(args)
        }else{
          return db.deleteFavorite(args.id)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});