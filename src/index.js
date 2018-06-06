import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import Search from './Search';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
const tmdb = '3390228324e8a091fabebee2d57020a4';
const omdb = 'bdc8301e';
let results = [];
let totalItems = [];

// TODO: keep items between going from MoviePage to Home
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    }
  }

  componentDidMount() {
    this.allItems = [];
    this.currentItems = [];
    
  }
  
  getPage() {
    mdb.discoverMovie({ with_genres: '80', page: this.state.currentPage, include_adult: false }, (error, response) => {
      if (!error) {
        this.currentItems = response.results;
        console.log('this.currentItems: ', this.currentItems);
        this.incrementPage();
        this.updateGrid();
      } else {
        console.error(error);
      }
    });
  }
  
  incrementPage() {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1
    }));
  }

  updateGrid() {
    let gridItems = this.currentItems.map((movie) => <MovieCard key={movie.id} movie={movie} /> );
    this.allItems = this.allItems.concat(gridItems);
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {(this.getPage())}}
        initialLoad={true}
        hasMore={true || false}
        threshold={500}
        loader={<div className="loader" key={0}><h1>Loading</h1></div>}
      >  
      <div id="grid">
          {this.allItems}
        </div>
      </InfiniteScroll>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/movie/:movieId" component={MoviePage} />
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div id="container">
          <div id="header">
            <Search />
          </div>
          <Filters />
          <MovieGrid />
        </div>
    );
  }
}

const Filters = () => (
  <div id="filters">
    <div id="filter-components">
      <h3>Released in</h3>
      <input className="slider" type="range" />
      <h3>Minimum score</h3>
      <input className="slider" type="range" />
      <input className="slider" type="range" />
      <input className="slider" type="range" />
      <h3>Genres</h3>
    </div>
  </div>
)

render(<App />, document.getElementById('root'));