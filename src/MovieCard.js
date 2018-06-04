import React from 'react';
import { Plus, Minus, XSymbol, View, Star, Info } from './Icons'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
const omdb = '50c53f3b';

export default class MovieCard extends React.Component {
  render() {
    return (
      <div className="movie-card" id={this.props.movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${this.props.movie.poster_path})` }}>
      <div className="sidebar">
        <div className="sidebar-icons">
          <Plus />
          <View />
          <XSymbol />
          <Link to={`/movie/${this.props.movie.id}`}><Info /></Link>
        </div>
      </div>
    </div>
    );
  }

}

// export default (props) => 
//   <div className="movie-card" id={props.movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.movie.poster_path})` }}>
//       <div className="sidebar">
//         <div className="sidebar-icons">
//           <Plus />
//           <View />
//           <XSymbol />
//           <Link to={`/movie/${props.movie.id}`}><Info /></Link>
//         </div>
//       </div>
//   </div>;