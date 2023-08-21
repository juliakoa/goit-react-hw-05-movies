import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
} from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import css from './App.module.css';

const App = () => {
  return (
    <div className={css.container}>
      <nav className={css.navbar}>
        <Link to="/" className={css.navLink}>
          Home
        </Link>
        <Link to="/movies" className={css.navLink}>
          Search
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/movies" element={<Movies />} />

        <Route path="*" element={<Outlet>Not Found</Outlet>} />
      </Routes>
    </div>
  );
};

export default App;
