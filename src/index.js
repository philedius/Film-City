import React from 'react';
import { render } from 'react-dom';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
var results = [];

function getPage(page = 1) {
  let today = new Date().toISOString().substr(0, 10);
  mdb.discoverMovie({ page: page }, (err, res) => {
    results = res.results;
    console.log(res);
    render(<App />, document.getElementById('root'));
    window.scrollTo(0, 0);
  });
}

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
    <div id="filter-components">
      <h3>Released in</h3>
      <h3>Minimum score</h3>
      <h3>Genres</h3>
    </div>
  </div>
)

const App = () => (
  <div id="container">
    <div id="header">
      <input id="search" type="search" placeholder="Search for movies, actors / actresses, genres ..." />
    </div>
    <Filters />
    <MovieGrid movies={results} />
    <div id="pagination">
      <span onClick={(e) => getPage(1)}>1</span>
      <span onClick={(e) => getPage(2)}>2</span>
      <span onClick={(e) => getPage(3)}>3</span>
      <span onClick={(e) => getPage(4)}>4</span>
      <span onClick={(e) => getPage(5)}>5</span>
      <span onClick={(e) => getPage(6)}>6</span>
      <span onClick={(e) => getPage(7)}>7</span>
      <span onClick={(e) => getPage(8)}>8</span>
    </div>
  </div>
);

getPage(1);