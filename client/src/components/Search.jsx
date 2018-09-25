import React from 'react';
import axios from 'axios';
import gql from 'graphql-tag';
import {client} from '../index.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this)
  }

  getGenres(){
    client.query({
      query: gql`
        {
          genres{
            id
            name
          }
        }
      `
    }).then(response=>this.setState({genres:response.data.genres}))
  }

  handleSelectGenre(genreID){
    this.setState({selectedGenre:genreID})
  }

  componentDidMount(){
    this.getGenres()
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select onChange={(e)=>this.handleSelectGenre(e.target.value)}>
          {this.state.genres.map(genre=>(
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>

        <button onClick={()=>this.props.handleSearch(this.state.selectedGenre)}>Search</button>

      </div>
    );
  }
}

export default Search;