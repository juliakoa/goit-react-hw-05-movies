import React, { useEffect, useState } from 'react';
import { useParams, NavLink, Route, Routes, Outlet } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const apiKey = '1d3da0c01c5d0a5aad09d8234aa92738';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  return (
    <div className={css.container}>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />

      <nav className={css.nav}>
        <NavLink to="cast" activeClassName={css.activeLink}>
          Cast
        </NavLink>
        <NavLink to={`reviews`} activeClassName={css.activeLink}>
          Reviews
        </NavLink>
      </nav>

      <div className={css.content}>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetails;
