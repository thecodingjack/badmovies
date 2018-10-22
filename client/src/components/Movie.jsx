import React from 'react'
const Movie = ({movie,handleMovieClick}) =>(
  <li className="movie_item">
    <img style={{cursor: "pointer"}} onClick={()=>handleMovieClick(movie)} src={movie.poster_path}/>
    <div className="movie_description">
      <h2>{movie.title}</h2>
      <section className="movie_details">
        <div className="movie_year">
          <span className="title">Year</span>
          <span>{movie.release_date.substring(0,4)}</span>
        </div>
        <div className="movie_rating">
          <span className="title">Rating</span>
          <span>{movie.vote_average}</span>
        </div>
      </section>
    </div>
  </li>
)

export default Movie; 