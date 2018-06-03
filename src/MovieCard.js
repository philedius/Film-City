import React from 'react';
import { Plus, Minus, XSymbol, View, Star, Info } from './Icons'
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default (props) => 
  <div className="movie-card" id={props.movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.movie.poster_path})` }}>
      <div className="sidebar">
        <div className="sidebar-icons">
          <Plus />
          <View />
          <XSymbol />
          <Link to={`/movie/${props.movie.id}`}><Info /></Link>
        </div>
      </div>
  </div>;