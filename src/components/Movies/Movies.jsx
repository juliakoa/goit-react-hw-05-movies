import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const apiKey = '1d3da0c01c5d0a5aad09d8234aa92738';
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      )
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.error('Error fetching movies:', error));
    }
  }, [query]);

  const handleSearch = event => {
    event.preventDefault();
    navigate(`/movies?query=${searchQuery}`);
  };

  return (
    <div className={css.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          placeholder="Search movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span className={css.movieTitle}>{movie.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
