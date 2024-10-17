import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9080e5dae0d64b920109d6e2e9c0a366')
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <div style={styles.container}>
        {movies.map(movie => (
          <MovieCard key={movie.id} result={movie} />
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
  

export default MovieList;
