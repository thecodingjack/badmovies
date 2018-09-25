import React from 'react';
import Movie from './Movie.jsx';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  handleMovieClick(movie){
    if(this.props.showFaves){
      this.props.deleteMovie(movie)
    }else{
      this.props.saveMovie(movie)
    }
  }

  render() {
    return (
      <ul className="movies">
        {this.props.movies && this.props.movies.map(movie=>(
          <Movie handleMovieClick={this.handleMovieClick.bind(this)} key={movie.title} movie={movie}/>
        ))}
      </ul>
    );
  }
}

export default Movies;