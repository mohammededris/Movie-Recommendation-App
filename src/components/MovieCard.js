import React, { useState } from 'react';

const MovieCard = ({ result }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{ 
        ...styles.card, 
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', 
        boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} 
        alt={result.title || result.name} 
        style={styles.image}
      />
      <div style={styles.content}>
        <h2 style={styles.title}>{result.title || result.name}</h2>
        <p style={styles.rating}>Rating: {result.vote_average}</p>
      </div>
      {isHovered && (
        <div style={styles.hoverContent}>
          <p>{result.overview}</p>
          <p>Release Date: {result.release_date || result.first_air_date}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    width: '200px',
    position: 'relative',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    backgroundColor: '#282828',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.2em',
    margin: '10px 0 5px',
    color: '#fff',
  },
  rating: {
    fontSize: '1em',
    color: '#ccc',
  },
  hoverContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '10px',
    boxSizing: 'border-box',
    textAlign: 'center',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
  },
};

export default MovieCard;
