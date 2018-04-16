import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
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

  componentWillUnmount() {
    
  }
  
  getPage() {
    let today = new Date().toISOString().substr(0, 10);
    mdb.discoverMovie({ page: this.state.currentPage, include_adult: false }, (err, res) => {
      this.currentItems = res.results;
      console.log(res);
      this.incrementPage();
      this.updateGrid();
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
        threshold={50}
        loader={<div className="loader" key={0}>Loading ...</div>}
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

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.match.params.movieId);
    mdb.movieInfo({ id: this.props.match.params.movieId }, (error, response) => {
      console.log(response);
      this.props.poop = response.adult;
    });
  }
  
  render() {
    return (
      <h1>hello</h1>
    )
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
            <input id="search" placeholder="Search for movies, actors / actresses, genres ..." />
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
      <h3>Minimum score</h3>
      <h3>Genres</h3>
    </div>
  </div>
)
render(<App />, document.getElementById('root'));