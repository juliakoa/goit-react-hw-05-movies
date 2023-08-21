import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const apiKey = '1d3da0c01c5d0a5aad09d8234aa92738';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setCast(data.cast))
      .catch(error => console.error('Error fetching cast:', error));
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.characterName}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
