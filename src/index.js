import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';
import './style.css';
const Vibrant = require('node-vibrant');
const mdb = require('moviedb')('3390228324e8a091fabebee2d57020a4');
const tmdb = '3390228324e8a091fabebee2d57020a4';
const omdb = 'bdc8301e';
let results = [];
let totalItems = [];

// mdb.configuration((error, response) => {
//   window.config = response;
//   console.log(window.config);
// });

mdb.genreMovieList((error, response) => {
  if (!error) {
    console.log('Genres', response.genres);
  } else {
    console.error(error);
  }
});

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

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      score: '',
      overview: '',
      ratings: [],
    };
  }

  componentDidMount() {

    axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=${tmdb}&append_to_response=credits`)
      .then((response) => {
        response = response.data;
        axios.get(`http://www.omdbapi.com/?i=${response.imdb_id}&apikey=${omdb}`)
        .then((res) => {
          console.log(res.data);
          this.setState({
            ratings: res.data.Ratings
          });
          for (let i = 0; i < res.data.Ratings.length; i++) {
            let rating = res.data.Ratings[i];
          }
        })
        .catch((error) => {
          console.log(error);
        });
        Vibrant.from('http://image.tmdb.org/t/p/w92' + response.poster_path).getPalette((err, palette) => {
          this.setState({
            backdropColor: getGradientFromPalette(palette)
          });
  
          let container = document.getElementsByClassName('movie-container')[0];
          container.style.opacity = 1;
          container.style.transform = 'scale(1)';
        });
  
        this.setState({
          title: response.title,
          score: response.vote_average,
          overview: response.overview,
          backdrop: 'http://image.tmdb.org/t/p/w1280' + response.backdrop_path,
          poster: 'http://image.tmdb.org/t/p/w342' + response.poster_path,
          releaseYear: response.release_date.substring(0, 4),

        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
        const Ratings = this.state.ratings.map((rating) => {
          let source;
          if (rating.Source === 'Internet Movie Database') source = 'imdb-color';
          if (rating.Source === 'Rotten Tomatoes') source = 'rottentomatoes-color';
          if (rating.Source === 'Metacritic') source = 'metacritic-color';
          return <span className={`rating ${source}`} key={rating.Source}>{rating.Value}</span>
        });
        return (
          <div className="movie-container">
            <div className="movie-backdrop" style={{backgroundImage: `url(${this.state.backdrop})`}}>
                <div className="movie-backdrop-color-overlay" style={{background: this.state.backdropColor}}>
                <div className="movie-info-container">
                  <div className="movie-poster" style={{backgroundImage: `url(${this.state.poster})`}}></div>
                  <div className="movie-text-info">
                    <h1>{this.state.title}<span className="release-year">({this.state.releaseYear})</span></h1>
                    <div className="movie-ratings">{Ratings}</div>
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
            <input id="search" autoComplete="off" placeholder="Search for movies, actors / actresses, genres ..." />
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

const getGradientFromPalette = (palette) => {
  let primaryColor;
  let secondaryColor;
  for (const color in palette) {
    if (palette[color] === null) continue;
    if (primaryColor === undefined) {
      primaryColor = color;
    };
    if (palette[color]._population > palette[primaryColor]._population) {
      primaryColor = color;
    }
  }

  for (const color in palette) {
    if (palette[color] === null) continue;
    if (color !== primaryColor) {
      if (secondaryColor === undefined) {
        secondaryColor = color;
      };
      if (secondaryColor !== undefined) {
        if (palette[color]._population > palette[secondaryColor]._population) {
          secondaryColor = color;
        }
      }
    }
  }

  primaryColor = {
    h: Math.floor(palette[primaryColor]._hsl[0] * 360),
    s: Math.floor(palette[primaryColor]._hsl[1] * 150).toString() + '%',
    l: Math.floor(palette[primaryColor]._hsl[2] * 100).toString() + '%',
  }

  secondaryColor = {
    h: Math.floor(palette[secondaryColor]._hsl[0] * 360),
    s: Math.floor(palette[secondaryColor]._hsl[1] * 150).toString() + '%',
    l: Math.floor(palette[secondaryColor]._hsl[2] * 100).toString() + '%',
  }
  primaryColor = `hsla(${primaryColor.h}, ${primaryColor.s}, ${primaryColor.l}, .925)`;
  secondaryColor = `hsla(${secondaryColor.h}, ${secondaryColor.s}, ${secondaryColor.l}, .925)`;
  return `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`;

}

render(<App />, document.getElementById('root'));