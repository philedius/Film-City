import React from 'react';
import { Plus, Minus, XSymbol, View, Star, Info } from './Icons'

export default (props) => 
<div className="movie-card" id={props.movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.movie.poster_path})` }}>
    <div className="info">
    <h1>{props.movie.title}</h1>
    <p>{props.movie.overview}</p>
    </div>
    <div className="sidebar">
      <div className="sidebar-icons">
        <Plus />
        <View />
        <XSymbol />
        <Info />
      </div>
    </div>
</div>;