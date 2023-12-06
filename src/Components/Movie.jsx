// Movie.jsx
import React from 'react';
import '../styles/Movie.css'

const Movie = ({ title, image, desc }) => {
  return (
    <div className="movie" >
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Movie;
