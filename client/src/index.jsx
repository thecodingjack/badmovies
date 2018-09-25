import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const client = new ApolloClient({
  link: new createHttpLink({uri: 'http://localhost:3000/graphql'}),
  cache: new InMemoryCache()
})

const GET_FAVS_QUERY = gql`
      query favs{
        favs{
          id
          title
          poster_path
          release_date
          vote_average
        }
      }
      `

const MUTATE_FAVS = gql`
mutation movies($id: Int, $title: String, $poster_path: String, $release_date: String, $vote_average: String, $action: String){
  movies(id: $id, title:$title, poster_path:$poster_path, release_date:$release_date, vote_average:$vote_average, action:$action,){
    id
    title
    poster_path
    release_date
    vote_average
  }
}
`
class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {movies:[],favorites:[]};
    
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.getFavs = this.getFavs.bind(this)
  }

  getMovies(genreID){
    client.query({
      query: gql`
        query movies($genre: String){
          movies(genre: $genre){
            id
            title
            poster_path
            release_date
            vote_average
          }
        }
      `,
      variables:{
        genre: genreID
      },
    }).then(response => {
      this.setState({movies:response.data.movies})
    })
  }

  getFavs(){
    client.query({
      query: GET_FAVS_QUERY,
    }).then(response => {
      this.setState({favorites:response.data.favs})
    })
  }

  saveMovie(movie) {
    movie.action = "save"
    client.mutate({
      mutation: MUTATE_FAVS,
      variables: movie,
      update: (store, {data: movies}) => {
        let data 
        try{
          data = store.readQuery({query: GET_FAVS_QUERY})
          data.favs.push(movies)
          store.writeQuery({query: GET_FAVS_QUERY, data})
        } catch (err){}
      }
    }).then(res=>console.log(res.data.movies))
      .catch(err=>console.log(err))
  }
  
  deleteMovie(movie) {
    movie.action = "delete"
    client.mutate({
      mutation: MUTATE_FAVS,
      variables: movie,
      update: (store, {data: movies}) => {
        let data 
        try{
          data = store.readQuery({query: GET_FAVS_QUERY})
          data.favs = data.favs.filter(fav=> fav.id !== movie.id)
          store.writeQuery({query: GET_FAVS_QUERY, data})
        } catch (err){}
      }
    }).then(res=>this.getFavs())
      .catch(err=>console.log(err))
  }

  swapFavorites() {
  //dont touch
    this.getFavs()
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount(){
    this.getMovies()
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>
        <div className="main">
          <Search client={this.props.client} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} handleSearch={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ApolloProvider client={client}>
  <App />
</ApolloProvider>, document.getElementById('app'));