import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const apiKey = '1d3da0c01c5d0a5aad09d8234aa92738';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setReviews(data.results))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2>Reviews</h2>
      <ul className={css.reviewList}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.author}>{review.author}</p>
              <p className={css.content}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
