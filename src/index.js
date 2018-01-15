import React from 'react';
import { render } from 'react-dom';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
var results = [];
// mdb.discoverMovie({ page: 1 }, (err, res) => {
//   console.log(res);
//   results = res.results;
//   render(<App />, document.getElementById('root'));
// });

function getPage(page = 1) {
  mdb.discoverMovie({ page: page }, (err, res) => {
    console.log(res);
    results = res.results;
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
  </div>
)

const App = () => (
  <div id="container">
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

getPage(2);