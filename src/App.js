import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const App = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9080e5dae0d64b920109d6e2e9c0a366')
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9080e5dae0d64b920109d6e2e9c0a366')
      .then(response => response.json())
      .then(data => setPopularMovies(data.results))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);

  const fetchMoviesAndShows = () => {
    let movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=9080e5dae0d64b920109d6e2e9c0a366`;
    let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=9080e5dae0d64b920109d6e2e9c0a366`;

    if (query) {
      movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=9080e5dae0d64b920109d6e2e9c0a366&query=${query}`;
      tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=9080e5dae0d64b920109d6e2e9c0a366&query=${query}`;
    }

    if (selectedGenre) {
      movieUrl += `&with_genres=${selectedGenre}`;
      tvUrl += `&with_genres=${selectedGenre}`;
    }

    if (year) {
      movieUrl += `&primary_release_year=${year}`;
      tvUrl += `&first_air_date_year=${year}`;
    }

    if (rating) {
      movieUrl += `&vote_average.gte=${rating}`;
      tvUrl += `&vote_average.gte=${rating}`;
    }

    const movieSearch = fetch(movieUrl).then(response => response.json());
    const tvSearch = fetch(tvUrl).then(response => response.json());

    Promise.all([movieSearch, tvSearch])
      .then(([movieData, tvData]) => {
        setResults([ ...tvData.results, ...movieData.results]);
        // Reset form values after search
        setQuery('');
        setSelectedGenre('');
        setYear('');
        setRating('');
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMoviesAndShows();
  };

  return (
    <div className="app-container">
      <button onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? 'Show Popular Movies' : 'Search Movies and TV Shows'}
      </button>
      {showSearch ? (
        <div className="search-container">
          <h1>Search Movies and TV Shows</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search by title (optional)"
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
      ) : (
        <div className="popular-container">
          <h1>Popular Movies</h1>
          <div style={styles.container}>
            {popularMovies.map(movie => (
              <MovieCard key={movie.id} result={movie} />
            ))}
          </div>
        </div>
      )}
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

export default App;
