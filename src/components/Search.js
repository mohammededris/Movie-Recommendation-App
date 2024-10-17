import React, { useState, useEffect } from 'react';
import './Search.css';
import MovieCard from './MovieCard';

const Search = ({ genres }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesAndShows();
    }
  }, [selectedGenre]);

  const fetchMoviesAndShows = () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=9080e5dae0d64b920109d6e2e9c0a366`;

    if (query) {
      url += `&query=${query}`;
    }

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    if (rating) {
      url += `&vote_average.gte=${rating}`;
    }

    console.log('Fetch URL:', url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetch Data:', data);
        setResults(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMoviesAndShows();
  };

  return (
    <div className="search-container">
      <h1>Search Movies and TV Shows</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search by title"
        />
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Year"
          min="1900"
          max={new Date().getFullYear()}
        />
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          placeholder="Rating"
          min="0"
          max="10"
          step="0.1"
        />
        <button type="submit">Search</button>
      </form>
      <div style={styles.container}>
        {results.map(result => (
          <MovieCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default Search;
