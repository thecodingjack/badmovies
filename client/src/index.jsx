import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

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

  getMovies(genreID) {
    axios.get('/search',{params: {genreID}})
      .then(({data})=>this.setState({movies:data}))
  }

  getFavs(){
    axios.get('/favs')
      .then(({data})=>this.setState({favorites:data}))
  }

  saveMovie(movie) {
    axios.post('/save',movie)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }

  deleteMovie(movie) {
    axios.post('/delete',{id:movie.id})
      .then(res=>this.getFavs())
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
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} handleSearch={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));