import React from 'react';
import { render } from 'react-dom';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
var results = [];
mdb.searchMovie({query: 'bad'}, (err, res) => {
  console.log(res);
  results = res.results;
  render(<App />, document.getElementById('root'));
});

function MovieGrid(props) {
  const movies = props.movies;
  const gridItems = movies.map((movie) =>
    <MovieCard movie={movie} />
  );
  return (
    <div id="grid">
      {gridItems}
    </div>
  )
}

const Filters = () => (
  <div id="filters">
  </div>
)

const App = () => (
  <div id="container">
  <Filters />
  <MovieGrid movies={results} />
  </div>
);