import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';
import './style.css';
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
let results = [];
let totalItems = [];
const discoverMovie = mdb.discoverMovie;

mdb.configuration((error, response) => {
  window.config = response;
  console.log(window.config);
})

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
    let hehe = mdb.discoverMovie({ primary_release_year: 2016, page: this.state.currentPage, include_adult: false }, (error, response) => {
      if (!error) {
        console.log(response);
        this.currentItems = response.results;
        this.incrementPage();
        this.updateGrid();
      } else {
        console.error(error);
      }
    });
    console.log(hehe);
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

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      score: '',
      overview: '',
    };
  }

  componentDidMount() {
    mdb.movieInfo({ id: this.props.match.params.movieId }, (error, response) => {
      console.log(response);
      this.setState({
        title: response.original_title,
        score: response.vote_average,
        overview: response.overview,
        backdrop: window.config.images.base_url + window.config.images.backdrop_sizes[3] + response.backdrop_path,
        poster: window.config.images.base_url + window.config.images.poster_sizes[3] + response.poster_path,
        releaseYear: response.release_date.substring(0, 4)
      });
    });
  }
  
  render() {
        return (
          <div className="movie-container">
            <div className="movie-backdrop" style={{backgroundImage: `url(${this.state.backdrop})`}}>
                <div className="movie-backdrop-gradient">
                <div className="movie-info-container">
                  <div className="movie-poster" style={{backgroundImage: `url(${this.state.poster})`}}></div>
                  <div className="movie-text-info">
                    <h1>{this.state.title}<span className="release-year">({this.state.releaseYear})</span></h1>
                    <div className="movie-overview"><p>{this.state.overview}</p></div>
                  </div>
                </div>
                </div>
              </div>
          </div>
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
            <input id="search" autoComplete="false" placeholder="Search for movies, actors / actresses, genres ..." />
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