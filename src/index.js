import React from 'react';
import { render } from 'react-dom';
import MovieCard from './MovieCard';
import './style.css';

const posters = [
  'http://cdn3-www.craveonline.com/assets/mandatory/legacy/2015/11/man_file_1063028_OneMissedCall.jpg',
  'https://designmodo.com/wp-content/uploads/2011/02/Creative-Movie-Posters-25.jpg',
  'http://www.wearemoviegeeks.com/wp-content/uploads/the-avengers-movie-poster.jpg',
  'https://static.highsnobiety.com/wp-content/uploads/2017/08/24235415/blade-runner-2049-official-poster-001-480x740.jpg',
  'https://i.pinimg.com/originals/dd/e3/f9/dde3f9d40017e58793fd3f3899ce481d.jpg',
  'http://illusion.scene360.com/wp-content/uploads/2014/03/cool-movie-posters-06.jpg',
  'http://img.moviepostershop.com/the-magnificent-seven-movie-poster-2016-1020776374.jpg',
  'http://www.webdesignmash.com/trial/wp-content/uploads/2012/10/awesome-80s-movie-posters-53.jpg',
  'https://static01.nyt.com/images/2017/09/24/arts/24movie-posters1/24movie-posters1-master1050.jpg',
  'https://politicalfilm.files.wordpress.com/2012/02/anonymous-movie-poster-01.jpg',
  'https://d9hhrg4mnvzow.cloudfront.net/seopages.adobeprojectm.com/make/posters/movie-posters/f2ca42a0-movie-3_09w0fb09w0fb000000.jpeg'
  ];

const Grid = () => (
  <div id="grid" >
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
    <MovieCard image={randomMoviePoster(posters)} />
  </div >
)

const Filters = () => (
  <div id="filters">
    <div id="home-logo">
      <h1>HOME</h1>
    </div>
  </div>
)

const App = () => (
  <div id="container">
  <Filters />
  <Grid />
  </div>
);

render(<App />, document.getElementById('root'));

function randomMoviePoster(moviePosters) {
  return moviePosters[Math.floor(Math.random() * moviePosters.length)];
}
