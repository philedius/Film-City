import React from 'react';
import axios from 'axios';

const tmdb = '3390228324e8a091fabebee2d57020a4';

export default class Search extends React.Component {
    
    componentDidMount() {
        this.search('star');
    }

    search(query) {
        axios.get(`https://api.themoviedb.org/3/search/multi?language=en-US&query=${query}&api_key=${tmdb}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    render() {
        return (
            <input id="search" autoComplete="off" placeholder="Search for movies, actors / actresses, genres ..." />
        );
    }
}