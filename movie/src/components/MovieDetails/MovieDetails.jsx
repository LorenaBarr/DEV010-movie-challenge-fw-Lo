import React from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movie }) => {
  return (
    <div>
      {/* Detalles específicos de la película */}
      <p>{movie.title}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default MovieDetails;