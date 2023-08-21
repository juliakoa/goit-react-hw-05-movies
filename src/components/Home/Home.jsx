import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const apiKey = '1d3da0c01c5d0a5aad09d8234aa92738';
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setTrendingMovies(data.results))
      .catch(error => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies Today</h1>
      <ul className={css.movieList}>
        {trendingMovies.map(movie => (
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

      <Link to="/movies">Search for a movie</Link>
    </div>
  );
};

export default Home;
