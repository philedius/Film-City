// TODO: SHIT BE GETTING PAGES ALL WRONG

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
let results = [];
let totalItems = [];
let currentPage = 1;

function getPage(page) {
  let today = new Date().toISOString().substr(0, 10);
  
  mdb.discoverMovie({ page: page, include_adult: false }, (err, res) => {
    results = res.results;
    console.log(res);
    render(<App />, document.getElementById('root'));
  });
}

function MovieGrid(props) {
  const movies = props.movies;
  let gridItems = movies.map((movie) => <MovieCard key={movie.id} movie={movie} /> );
  totalItems = totalItems.concat(gridItems);
  console.log(currentPage);
  return (
    <InfiniteScroll
      pageStart={currentPage}
      loadMore={getPage}
      // initialLoad={true}
      hasMore={true || false}
      threshold={100}
      // useCapture={true}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >  
    <div id="grid">
        {totalItems}
      </div>
    </InfiniteScroll>
  )
}


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/movie/:movieId" component={MoviePage} />
    </div>
  </Router>
);

const MoviePage = ({match}) => (
  <h1>{match.params.movieId}</h1>
);

function Home(props) {
  currentPage += 1;
  return (
    <div id="container">
        <div id="header">
          <input id="search" placeholder="Search for movies, actors / actresses, genres ..." />
        </div>
        <Filters />
        <MovieGrid movies={results} />
      </div>
  );
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
// render(<App />, document.getElementById('root'));

if (currentPage === 1) getPage(currentPage);